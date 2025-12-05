import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 1. Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log({ admin })

  // 2. Badges
  const badgesData = [
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
  ]

  for (const badge of badgesData) {
    await prisma.badge.upsert({
      where: { id: badge.id },
      update: {},
      create: badge,
    })
  }
  console.log('Badges seeded')

  // 3. Challenges
  const challengesData = [
    {
      id: 'c1',
      title: 'Défi Principal: L\'Inclusion Numérique',
      description: 'Créer une solution innovante pour l\'inclusion...',
      pointsReward: 100,
      difficulty: 'Hard',
      isActive: true,
      type: 'MAIN',
      accessibilityInfo: 'Respecter ARIA'
    },
    {
      id: 'c2',
      title: 'Bonus Accessibilité',
      description: 'Respecter les normes WCAG AA',
      pointsReward: 50,
      difficulty: 'Medium',
      isActive: true,
      type: 'BONUS',
      accessibilityInfo: 'Contrastes et navigation clavier'
    },
    {
      id: 'c3',
      title: 'Easter Egg',
      description: 'Trouvez le lapin caché',
      pointsReward: 20,
      difficulty: 'Easy',
      isActive: false,
      type: 'BONUS'
    }
  ]

  for (const challenge of challengesData) {
    await prisma.challenge.upsert({
      where: { id: challenge.id },
      update: {},
      create: challenge,
    })
  }
  console.log('Challenges seeded')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
