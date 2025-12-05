import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await auth();

  // Redirect authenticated users to their appropriate dashboard
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (user) {
      if (user.role === 'ADMIN') {
        redirect('/admin');
      } else if (user.role === 'JURY') {
        redirect('/jury');
      } else {
        redirect('/dashboard');
      }
    }
  }

  // If not authenticated, redirect to login page
  redirect('/login');
}
