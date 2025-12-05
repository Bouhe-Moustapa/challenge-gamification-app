'use client';

import { Team } from "@/types";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

interface PodiumProps {
  teams: Team[];
}

export function Podium({ teams }: PodiumProps) {
  const [first, second, third] = teams;

  return (
    <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 py-8">
      {second && <PodiumStep team={second} position={2} />}
      {first && <PodiumStep team={first} position={1} />}
      {third && <PodiumStep team={third} position={3} />}
    </div>
  );
}

function PodiumStep({ team, position }: { team: Team; position: number }) {
  const isFirst = position === 1;
  const height = isFirst ? 'h-64' : position === 2 ? 'h-48' : 'h-32';
  const color = isFirst ? 'bg-yellow-500' : position === 2 ? 'bg-slate-400' : 'bg-orange-700';

  return (
    <div className="flex flex-col items-center w-full md:w-48">
      <div className="flex flex-col items-center mb-2 space-y-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={team.logo_url} 
          alt={`Logo de ${team.name}`} 
          className={cn("rounded-full border-4 border-slate-800", isFirst ? "w-20 h-20" : "w-16 h-16")} 
        />
        <div className="text-center">
          <div className="font-bold text-sm truncate max-w-[150px]">{team.name}</div>
          <div className="text-xs text-slate-400">{team.score} pts</div>
        </div>
      </div>
      
      <div 
        className={cn(
          "w-full rounded-t-lg flex flex-col items-center justify-end pb-4 relative", 
          height, 
          color,
          "bg-opacity-20 border border-b-0 border-slate-700 backdrop-blur-sm"
        )}
      >
        {isFirst && <Crown className="absolute -top-6 text-yellow-500 animate-bounce" />}
        <div className="text-3xl font-bold text-white/90">#{position}</div>
      </div>
    </div>
  );
}
