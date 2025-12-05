'use client';

import { Podium } from "@/components/Podium";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { TEAMS } from "@/lib/data";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  // Simulate sorting by points
  const sortedTeams = [...TEAMS].sort((a, b) => b.score - a.score);
  const top3 = sortedTeams.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 rounded-full mb-4">
          <Trophy className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Classement Général
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Suivez en temps réel la progression des équipes dans cette Nuit de l&apos;Info.
        </p>
        
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-medium animate-pulse"
          aria-live="polite"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Mise à jour en temps réel
        </div>
      </div>

      <Podium teams={top3} />
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Tous les participants</h2>
        <LeaderboardTable teams={sortedTeams} />
      </div>
    </div>
  );
}
