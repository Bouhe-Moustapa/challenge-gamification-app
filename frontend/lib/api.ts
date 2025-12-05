import { TEAMS, CHALLENGES } from './data';
import { Team, Challenge } from '@/types';

// Simulation of the Django Rest Framework API Service
// In real implementation, these would fetch from process.env.NEXT_PUBLIC_API_URL

export async function getTeams(): Promise<Team[]> {
  // GET /api/teams/
  return new Promise((resolve) => {
    setTimeout(() => resolve(TEAMS), 500);
  });
}

export async function getTeam(id: string): Promise<Team | undefined> {
  // GET /api/teams/{id}/
  return new Promise((resolve) => {
    const team = TEAMS.find(t => t.id === id || t.slug === id);
    setTimeout(() => resolve(team), 500);
  });
}

export async function getChallenges(): Promise<Challenge[]> {
  // GET /api/challenges/
  return new Promise((resolve) => {
    setTimeout(() => resolve(CHALLENGES), 500);
  });
}

export async function getLeaderboard(): Promise<Team[]> {
  // GET /api/leaderboard/
  // Should return teams sorted by score desc
  return new Promise((resolve) => {
    const sorted = [...TEAMS].sort((a, b) => b.score - a.score);
    setTimeout(() => resolve(sorted), 500);
  });
}
