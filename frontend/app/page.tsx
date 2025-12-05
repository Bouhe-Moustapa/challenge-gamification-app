import Link from "next/link";
import { Trophy, Users, Shield, LogIn, Lock } from "lucide-react";
import { auth, signOut } from "@/auth";
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8 text-center space-y-12">
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-full mb-4 ring-1 ring-white/10">
          <Trophy className="h-16 w-16 text-yellow-500" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tight">
          Nuit Arena
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          La plateforme de gamification ultime pour la Nuit de l&apos;Info. 
          Suivez votre progression, débloquez des badges et dominez le classement.
        </p>

        {session ? (
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700 max-w-lg mx-auto">
            <p className="text-white mb-4">
              Bonjour, <span className="font-bold text-yellow-500">{session.user?.name || session.user?.email}</span>
              <br />
              Role: <span className="uppercase font-mono text-xs bg-slate-800 px-2 py-1 rounded">{session.user?.role}</span>
            </p>
            <div className="flex flex-col gap-2">
              {session.user?.role === 'ADMIN' && (
                 <Link 
                 href="/admin" 
                 className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all"
               >
                 <Lock className="w-4 h-4" />
                 Administration
               </Link>
              )}
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium rounded-lg transition-all">
                  <LogIn className="w-4 h-4 rotate-180" />
                  Se déconnecter
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
             <Link 
              href="/login" 
              className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all transform hover:scale-105"
            >
              <LogIn className="w-5 h-5" />
              Se connecter
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
        <Link 
          href="/leaderboard" 
          className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-xl transition-all transform hover:scale-105"
        >
          <Trophy className="w-5 h-5" />
          Voir le classement
        </Link>
        <Link 
          href="/team/t1" 
          className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 border border-slate-700"
        >
          <Users className="w-5 h-5" />
          Espace Équipe
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl w-full pt-12 border-t border-slate-800/50">
        <Feature 
          icon={<Trophy className="w-6 h-6 text-yellow-500" />}
          title="Compétition en temps réel"
          description="Suivez l'évolution des scores minute par minute. Le suspense est total jusqu'au bout de la nuit."
        />
        <Feature 
          icon={<Shield className="w-6 h-6 text-emerald-500" />}
          title="Accessibilité & Inclusion"
          description="Gagnez des bonus en respectant les normes WCAG. Une application pour tous, par tous."
        />
        <Feature 
          icon={<Users className="w-6 h-6 text-blue-500" />}
          title="Esprit d'Équipe"
          description="Collaborer, partager et progresser ensemble. Chaque commit compte pour la victoire finale."
        />
      </div>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
      <div className="bg-slate-950 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-slate-800">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}
