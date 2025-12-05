import { prisma } from "@/lib/prisma"
import { Plus, Trophy } from "lucide-react"

export default async function AdminChallengesPage() {
  const challenges = await prisma.challenge.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Gestion des Défis</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          Nouveau Défi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{challenge.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-3">{challenge.description}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500 flex-shrink-0 ml-2" />
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Points:</span>
                <span className="font-semibold text-blue-600">{challenge.pointsReward}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Difficulté:</span>
                <span className={`font-semibold ${
                  challenge.difficulty === 'EASY' ? 'text-green-600' :
                  challenge.difficulty === 'MEDIUM' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {challenge.difficulty}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Catégorie:</span>
                <span className="font-semibold text-slate-700">{challenge.category}</span>
              </div>
            </div>
          </div>
        ))}
        
        {challenges.length === 0 && (
          <div className="col-span-full text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
            Aucun défi créé pour le moment.
          </div>
        )}
      </div>
    </div>
  )
}
