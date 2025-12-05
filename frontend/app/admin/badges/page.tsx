import { prisma } from "@/lib/prisma"
import { Plus, Award } from "lucide-react"

export default async function AdminBadgesPage() {
  const badges = await prisma.badge.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Gestion des Badges</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          Nouveau Badge
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <div key={badge.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <Award className="w-16 h-16 text-yellow-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{badge.name}</h3>
            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{badge.condition}</p>
            <div className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full inline-block">
              ID: {badge.id.slice(0, 8)}...
            </div>
          </div>
        ))}
        
        {badges.length === 0 && (
          <div className="col-span-full text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
            Aucun badge créé pour le moment.
          </div>
        )}
      </div>
    </div>
  )
}
