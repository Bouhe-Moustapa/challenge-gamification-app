import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { FileCheck, Users, Trophy, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default async function JuryDashboard() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! }
  })

  if (!user || user.role !== 'JURY') {
    redirect('/dashboard')
  }

  // Get pending submissions
  const submissions = await prisma.submission.findMany({
    include: {
      team: true,
      challenge: true
    },
    orderBy: { createdAt: 'desc' },
    take: 20
  })

  const pendingCount = submissions.filter(s => s.status === 'PENDING').length
  const approvedCount = submissions.filter(s => s.status === 'VALIDATED').length
  const rejectedCount = submissions.filter(s => s.status === 'REJECTED').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-purple-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Tableau de Bord Jury</h1>
              <p className="text-purple-300">Bienvenue, {user.name || user.email}</p>
            </div>
            <Link 
              href="/api/auth/signout"
              className="text-purple-300 hover:text-white text-sm"
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
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <FileCheck className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <p className="text-purple-300 text-sm">En Attente</p>
                <p className="text-2xl font-bold text-white">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <p className="text-purple-300 text-sm">Approuvées</p>
                <p className="text-2xl font-bold text-white">{approvedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <p className="text-purple-300 text-sm">Rejetées</p>
                <p className="text-2xl font-bold text-white">{rejectedCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FileCheck className="w-6 h-6" />
            Soumissions Récentes
          </h2>
          
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-white">{submission.challenge.title}</h3>
                    <p className="text-sm text-purple-300 flex items-center gap-2 mt-1">
                      <Users className="w-4 h-4" />
                      {submission.team.name}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    submission.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                    submission.status === 'VALIDATED' ? 'bg-green-500/20 text-green-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {submission.status === 'PENDING' ? 'En attente' :
                     submission.status === 'VALIDATED' ? 'Validée' : 'Rejetée'}
                  </span>
                </div>
                
                {submission.comment && (
                  <p className="text-sm text-slate-300 mb-3">{submission.comment}</p>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-purple-400">
                    Soumis le {new Date(submission.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                  {submission.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded">
                        Approuver
                      </button>
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded">
                        Rejeter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {submissions.length === 0 && (
              <div className="text-center py-12 text-purple-300">
                Aucune soumission pour le moment.
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/leaderboard"
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
          >
            <Trophy className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Classement</h3>
            <p className="text-sm text-purple-300">Voir le classement des équipes</p>
          </Link>
          
          <Link 
            href="/admin"
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
          >
            <Users className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Équipes</h3>
            <p className="text-sm text-purple-300">Gérer les équipes participantes</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
