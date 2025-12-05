import { prisma } from "@/lib/prisma"
import { Plus, Users as UsersIcon, Shield, Crown } from "lucide-react"
import { CreateUserForm } from "./CreateUserForm"

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: { Team: true },
    orderBy: { createdAt: 'desc' }
  })

  const teams = await prisma.team.findMany()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Gestion des Utilisateurs</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create User Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nouvel Utilisateur
            </h2>
            <CreateUserForm teams={teams} />
          </div>
        </div>

        {/* Users List */}
        <div className="lg:col-span-2 space-y-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{user.name || 'Sans nom'}</h3>
                    {user.role === 'ADMIN' && (
                      <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-semibold">
                        <Shield className="w-3 h-3" />
                        ADMIN
                      </span>
                    )}
                    {user.role === 'JURY' && (
                      <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold">
                        <Shield className="w-3 h-3" />
                        JURY
                      </span>
                    )}
                    {user.isTeamCaptain && (
                      <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold">
                        <Crown className="w-3 h-3" />
                        CAPITAINE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 font-mono mb-3">{user.email}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4" />
                      {user.Team ? user.Team.name : 'Aucune équipe'}
                    </span>
                    <span>•</span>
                    <span className="text-xs">
                      Créé le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    ID: {user.id.slice(0, 8)}...
                  </span>
                </div>
              </div>
            </div>
          ))}
          {users.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
              Aucun utilisateur créé pour le moment.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
