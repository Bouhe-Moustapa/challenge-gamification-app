export type Role = 'ADMIN' | 'JURY' | 'TEAM_MEMBER' | 'SPECTATOR';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Badge {
  id: string;
  name: string; // Was label
  icon: string;
  condition: string; // Was description
}

export interface Member {
  id: string;
  name: string;
  role: string; // 'Captain' | 'Member'
  avatar_url?: string;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  color?: string;
  logo_url: string; // Keep for UI, assume backend provides it
  description: string;
  score: number; // Was total_points
  
  // Frontend derived or optional props
  city?: string; 
  level?: number; 
  rank?: number;
  badges: Badge[];
  members?: Member[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points_reward: number; // Was max_points
  difficulty: Difficulty;
  is_active: boolean;
  accessibility_info?: string;
  type?: 'MAIN' | 'BONUS'; // Keep for UI filtering
}

export interface Submission {
  id: string;
  team_id: string;
  challenge_id: string;
  proof_url: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  feedback?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  profile: {
    avatar_url: string;
    bio: string;
    total_points: number;
  }
}
