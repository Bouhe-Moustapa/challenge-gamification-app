const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: { createdAt: 'desc' },
      take: 1
    })
    console.log('Successfully queried challenges by createdAt:', challenges)
  } catch (e) {
    console.error('Error querying challenges:', e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
