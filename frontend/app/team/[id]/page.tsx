'use client';

import { useParams } from "next/navigation";
import { TEAMS, CHALLENGES } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Trophy, Medal, Clock, Star, TrendingUp } from "lucide-react";
import { Team, Badge } from "@/types"; // Import types

export default function TeamPage() {
  const params = useParams();
  const teamId = params.id as string;
  const team = TEAMS.find(t => t.id === teamId) || TEAMS[0]; // Fallback to first team for demo

  const sortedTeams = [...TEAMS].sort((a, b) => b.score - a.score);
  const rank = sortedTeams.findIndex(t => t.id === team.id) + 1;
  const nextTeam = rank > 1 ? sortedTeams[rank - 2] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <TeamHeader team={team} rank={rank} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ChallengeProgress />
          <Timeline />
        </div>
        
        <div className="space-y-8">
          <NextTarget target={nextTeam} currentPoints={team.score} />
          <BadgesList badges={team.badges} />
        </div>
      </div>
    </div>
  );
}

function TeamHeader({ team, rank }: { team: Team, rank: number }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={team.logo_url} 
        alt={`Logo ${team.name}`} 
        className="w-32 h-32 rounded-full border-4 border-slate-800 bg-slate-800" 
      />
      <div className="text-center md:text-left flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{team.name}</h1>
        <p className="text-slate-400 text-lg mb-4">{team.description}</p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <div className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-2">
            <Trophy className="text-yellow-500 w-5 h-5" />
            <span className="font-bold text-white">{team.score} pts</span>
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-2">
            <TrendingUp className="text-emerald-500 w-5 h-5" />
            <span className="font-bold text-white">Rang #{rank}</span>
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-2">
            <Star className="text-purple-500 w-5 h-5" />
            <span className="font-bold text-white">Niveau {team.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


function ChallengeProgress() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Medal className="text-blue-500" />
        Progression des Défis
      </h2>
      <div className="space-y-6">
        {CHALLENGES.map((challenge) => (
          <div key={challenge.id} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">{challenge.title}</span>
              <span className="text-slate-400">{challenge.type === 'MAIN' ? '100%' : '0%'}</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  challenge.type === 'MAIN' ? "bg-blue-500 w-full" : "bg-slate-700 w-0"
                )}
              />
            </div>
            <p className="text-xs text-slate-500">{challenge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  const events = [
    { time: "03:12", title: "Bonus Accessibilité", points: "+10 pts", type: "success" },
    { time: "02:45", title: "Commit Validé", points: "Night Coder", type: "info" },
    { time: "01:30", title: "Défi Principal", points: "+50 pts", type: "success" },
  ];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Clock className="text-orange-500" />
        Timeline
      </h2>
      <div className="border-l-2 border-slate-800 ml-3 space-y-8 pl-6 relative">
        {events.map((event, i) => (
          <div key={i} className="relative">
            <div className={cn(
              "absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-slate-900",
              event.type === 'success' ? "bg-emerald-500" : "bg-blue-500"
            )} />
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400 text-sm font-mono">{event.time}</span>
              <span className={cn(
                "text-xs font-bold px-2 py-1 rounded",
                event.type === 'success' ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
              )}>
                {event.points}
              </span>
            </div>
            <h3 className="text-white font-medium">{event.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function NextTarget({ target, currentPoints }: { target: Team | null, currentPoints: number }) {
  if (!target) return null;
  const diff = target.score - currentPoints;

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Prochaine Cible</h3>
      <div className="flex items-center gap-4 mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={target.logo_url} className="w-12 h-12 rounded-full bg-slate-700" alt="" />
        <div>
          <div className="font-bold text-white">{target.name}</div>
          <div className="text-xs text-emerald-400">+{diff} points d&apos;écart</div>
        </div>
      </div>
      <div className="text-xs text-slate-500 text-center">
        &quot;Allez, un petit bonus UX et vous passez devant !&quot;
      </div>
    </div>
  );
}

function BadgesList({ badges }: { badges: Badge[] }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Badges Débloqués</h2>
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge) => (
          <div key={badge.id} className="bg-slate-800/50 p-3 rounded-lg flex flex-col items-center text-center gap-2">
            <div className="p-2 bg-indigo-500/20 rounded-full text-indigo-400">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{badge.name}</div>
              <div className="text-[10px] text-slate-500">{badge.condition}</div>
            </div>
          </div>
        ))}
        {badges.length === 0 && (
          <div className="col-span-2 text-center text-slate-500 py-4 italic">
            Encore aucun badge... Codez plus vite !
          </div>
        )}
      </div>
    </div>
  );
}
