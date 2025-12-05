import { Team } from "@/types";
import { cn } from "@/lib/utils";
import { Badge as BadgeIcon } from "lucide-react";

interface LeaderboardTableProps {
  teams: Team[];
}

export function LeaderboardTable({ teams }: LeaderboardTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400 uppercase font-medium border-b border-slate-800">
          <tr>
            <th className="px-6 py-4 w-16 text-center">#</th>
            <th className="px-6 py-4">Équipe</th>
            <th className="px-6 py-4">Badges</th>
            <th className="px-6 py-4 text-right">Points</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {teams.map((team, index) => (
            <tr 
              key={team.id} 
              className={cn(
                "hover:bg-slate-800/50 transition-colors",
                index < 3 ? "font-semibold" : ""
              )}
            >
              <td className="px-6 py-4 text-center">
                <span className={cn(
                  "inline-flex items-center justify-center w-8 h-8 rounded-full",
                  index === 0 ? "bg-yellow-500/20 text-yellow-500" :
                  index === 1 ? "bg-slate-400/20 text-slate-400" :
                  index === 2 ? "bg-orange-700/20 text-orange-700" :
                  "text-slate-500"
                )}>
                  {index + 1}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={team.logo_url} 
                    alt="" 
                    className="w-10 h-10 rounded-full bg-slate-800" 
                  />
                  <div>
                    <div className="text-white">{team.name}</div>
                    <div className="text-xs text-slate-500">{team.city || 'Nuit de l\'Info'}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  {team.badges.length > 0 ? team.badges.map((badge) => (
                    <div 
                      key={badge.id} 
                      title={badge.name}
                      className="p-1.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                    >
                      <BadgeIcon className="w-4 h-4" />
                    </div>
                  )) : (
                    <span className="text-slate-600 text-xs italic">Aucun badge</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-emerald-400 font-bold">{team.score}</span>
                <span className="text-slate-600 text-xs ml-1">pts</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
