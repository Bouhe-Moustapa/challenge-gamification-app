import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Users, Trophy, Target, Award } from "lucide-react"
import Link from "next/link"

export default async function UserDashboard() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: { team: true }
  })

  if (!user) {
    redirect('/login')
  }

  // Get team stats if user has a team
  const teamStats = user.teamId ? await prisma.team.findUnique({
    where: { id: user.teamId },
    include: {
      users: true,
      badges: {
        include: { badge: true }
      }
    }
  }) : null

  // Get available challenges
  const challenges = await prisma.challenge.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Tableau de Bord</h1>
              <p className="text-slate-300">Bienvenue, {user.name || user.email}</p>
            </div>
            <Link 
              href="/api/auth/signout"
              className="text-slate-300 hover:text-white text-sm"
            >
              Déconnexion
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-300 text-sm">Mon Équipe</p>
                <p className="text-2xl font-bold text-white">
                  {teamStats ? teamStats.name : 'Aucune équipe'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-300 text-sm">Points d&apos;Équipe</p>
                <p className="text-2xl font-bold text-white">
                  {teamStats?.totalPoints || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-300 text-sm">Badges Obtenus</p>
                <p className="text-2xl font-bold text-white">
                  {teamStats?.badges.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Info */}
        {teamStats && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Membres de l&apos;Équipe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamStats.users.map((member) => (
                <div key={member.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="font-semibold text-white">{member.name || 'Sans nom'}</p>
                  <p className="text-sm text-slate-300">{member.email}</p>
                  {member.isTeamCaptain && (
                    <span className="inline-block mt-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                      👑 Capitaine
                    </span>
                  )}
                </div>
              ))}
            </div>
            <Link 
              href={`/team/${user.teamId}`}
              className="mt-4 inline-block text-blue-400 hover:text-blue-300 text-sm"
            >
              Voir la page complète de l&apos;équipe →
            </Link>
          </div>
        )}

        {/* Challenges */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Défis Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="font-bold text-white mb-2">{challenge.title}</h3>
                <p className="text-sm text-slate-300 mb-3 line-clamp-2">{challenge.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                    {challenge.category}
                  </span>
                  <span className="text-yellow-400 font-semibold">
                    {challenge.pointsReward} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link 
            href="/leaderboard"
            className="mt-4 inline-block text-blue-400 hover:text-blue-300 text-sm"
          >
            Voir le classement complet →
          </Link>
        </div>
      </div>
    </div>
  )
}
