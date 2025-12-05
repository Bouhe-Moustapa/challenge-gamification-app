import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnJury = nextUrl.pathname.startsWith('/jury');
      
      if (isOnDashboard || isOnAdmin || isOnJury) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // If user is logged in and trying to access login page, redirect them
        // but we handle this in the page components usually, or here.
        // For now, let's just allow them to proceed to where they want, or redirect to dashboard if on home/login
        // But strict logic is better handled in the page or a separate check.
        // This callback is primarily for protecting routes.
        return true;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (token.role && session.user) {
        session.user.role = token.role as string
      }
      return session
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
