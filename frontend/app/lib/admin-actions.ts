'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import bcrypt from "bcryptjs"

const TeamSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
  city: z.string().optional(),
})

const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN", "JURY"]),
  teamId: z.string().optional(),
  isTeamCaptain: z.boolean().optional(),
})

export async function createTeam(prevState: unknown, formData: FormData) {
  const validatedFields = TeamSchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    city: formData.get('city'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields',
    }
  }

  try {
    await prisma.team.create({
      data: {
        name: validatedFields.data.name,
        slug: validatedFields.data.slug,
        city: validatedFields.data.city,
      },
    })
    revalidatePath('/admin/teams')
    return { message: 'Team created successfully', success: true }
  } catch (error) {
    console.error(error)
    return { message: 'Failed to create team. Slug might be taken.' }
  }
}

export async function createUser(prevState: unknown, formData: FormData) {
  const validatedFields = UserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
    teamId: formData.get('teamId') || undefined,
    isTeamCaptain: formData.get('isTeamCaptain') === 'on',
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields',
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10)
    
    await prisma.user.create({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        password: hashedPassword,
        role: validatedFields.data.role,
        teamId: validatedFields.data.teamId,
        isTeamCaptain: validatedFields.data.isTeamCaptain || false,
      },
    })
    
    revalidatePath('/admin/users')
    return { message: 'User created successfully', success: true }
  } catch (error) {
    console.error(error)
    return { message: 'Failed to create user. Email might already exist.' }
  }
}
