'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Users, ShieldCheck, LogIn, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Don't show navbar on login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Nuit Arena
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {session ? (
                <>
                  <Link 
                    href="/leaderboard" 
                    className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Trophy className="h-4 w-4" />
                    Leaderboard
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    Mon Équipe
                  </Link>
                  {session.user?.role === 'ADMIN' && (
                    <Link 
                      href="/admin" 
                      className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Connexion
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
