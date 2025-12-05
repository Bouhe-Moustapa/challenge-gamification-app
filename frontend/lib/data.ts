import { Badge, Challenge, Team } from '@/types';

export const BADGES: Badge[] = [
  {
    id: '1',
    name: 'Early Bird',
    condition: 'Rendu avant minuit',
    icon: 'Zap'
  },
  {
    id: '2',
    name: 'Accessibility Hero',
    condition: 'Score accessibilité > 80',
    icon: 'Eye'
  },
  {
    id: '3',
    name: 'Night Coder',
    condition: 'Commit entre 3h et 4h',
    icon: 'Moon'
  },
  {
    id: '4',
    name: 'All-In',
    condition: 'Participation à tous les défis',
    icon: 'Trophy'
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'Défi Principal: L\'Inclusion Numérique',
    description: 'Créer une solution innovante pour l\'inclusion...',
    points_reward: 100,
    difficulty: 'Hard',
    is_active: true,
    type: 'MAIN',
    accessibility_info: 'Respecter ARIA'
  },
  {
    id: 'c2',
    title: 'Bonus Accessibilité',
    description: 'Respecter les normes WCAG AA',
    points_reward: 50,
    difficulty: 'Medium',
    is_active: true,
    type: 'BONUS',
    accessibility_info: 'Contrastes et navigation clavier'
  },
  {
    id: 'c3',
    title: 'Easter Egg',
    description: 'Trouvez le lapin caché',
    points_reward: 20,
    difficulty: 'Easy',
    is_active: false,
    type: 'BONUS'
  }
];

export const TEAMS: Team[] = [
  {
    id: 't1',
    name: 'Pixel Pioneers',
    slug: 'pixel-pioneers',
    logo_url: 'https://api.dicebear.com/7.x/identicon/svg?seed=Pixel',
    description: 'Une équipe passionnée par le pixel art et l\'accessibilité.',
    city: 'Paris',
    level: 2,
    score: 120,
    badges: [BADGES[0]],
    members: [
      { id: 'm1', name: 'Alice', role: 'Captain' },
      { id: 'm2', name: 'Bob', role: 'Member' }
    ]
  },
  {
    id: 't2',
    name: 'Code Breakers',
    slug: 'code-breakers',
    logo_url: 'https://api.dicebear.com/7.x/identicon/svg?seed=Code',
    description: 'On casse le code pour mieux le reconstruire.',
    city: 'Lyon',
    level: 3,
    score: 210,
    badges: [BADGES[0], BADGES[1]]
  },
  {
    id: 't3',
    name: 'Night Owls',
    slug: 'night-owls',
    logo_url: 'https://api.dicebear.com/7.x/identicon/svg?seed=Night',
    description: 'Le code appartient à ceux qui se couchent tard.',
    city: 'Nantes',
    level: 1,
    score: 45,
    badges: []
  },
  {
    id: 't4',
    name: 'Accessibility First',
    slug: 'accessibility-first',
    logo_url: 'https://api.dicebear.com/7.x/identicon/svg?seed=Access',
    description: 'L\'accessibilité n\'est pas une option.',
    city: 'Bordeaux',
    level: 2,
    score: 95,
    badges: [BADGES[1]]
  }
];
