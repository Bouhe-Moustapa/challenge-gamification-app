const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    })

    if (!user) {
      console.log('Admin user NOT found!')
    } else {
      console.log('Admin user found:', { ...user, password: '[REDACTED]' })
      
      const isValid = await bcrypt.compare('admin123', user.password)
      console.log('Password "admin123" is valid:', isValid)
      
      // Also check role
      console.log('User Role:', user.role)
    }
  } catch (e) {
    console.error('Error checking admin:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
