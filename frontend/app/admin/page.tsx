import { prisma } from "@/lib/prisma"
import { Users, Flag, Trophy, CheckCircle } from "lucide-react"

export default async function AdminDashboard() {
  const [teamsCount, challengesCount, badgesCount, usersCount] = await Promise.all([
    prisma.team.count(),
    prisma.challenge.count(),
    prisma.badge.count(),
    prisma.user.count(),
  ])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Tableau de bord</h1>
        <div className="text-sm text-slate-500">
          Dernière mise à jour: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Équipes" value={teamsCount} icon={<Users className="w-6 h-6 text-blue-500" />} />
        <StatCard title="Défis Actifs" value={challengesCount} icon={<Flag className="w-6 h-6 text-red-500" />} />
        <StatCard title="Badges" value={badgesCount} icon={<Trophy className="w-6 h-6 text-yellow-500" />} />
        <StatCard title="Utilisateurs" value={usersCount} icon={<CheckCircle className="w-6 h-6 text-green-500" />} />
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Activité Récente</h3>
        <p className="text-slate-500 text-center py-8">Aucune activité récente à afficher.</p>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  )
}
