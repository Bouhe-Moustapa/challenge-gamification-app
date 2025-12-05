import { prisma } from "@/lib/prisma"
import { Plus, MapPin } from "lucide-react"
import { CreateTeamForm } from "./CreateTeamForm"

export default async function AdminTeamsPage() {
  const teams = await prisma.team.findMany({
    include: { _count: { select: { User: true } } },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Gestion des Équipes</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Team Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nouvelle Équipe
            </h2>
            <CreateTeamForm />
          </div>
        </div>

        {/* Teams List */}
        <div className="lg:col-span-2 space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{team.name}</h3>
                <p className="text-sm text-slate-500 font-mono">@{team.slug}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {team.city || 'Non renseigné'}
                  </span>
                  <span>•</span>
                  <span>{team._count.User} membres</span>
                </div>
              </div>
              <div className="text-right">
                 {/* Actions placeholder */}
                 <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">ID: {team.id.slice(0, 8)}...</span>
              </div>
            </div>
          ))}
          {teams.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
              Aucune équipe créée pour le moment.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
