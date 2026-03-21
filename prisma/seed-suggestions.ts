import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  // Seed Amperage Suggestions
  const amperageValues = [
    { value: 1, isPopular: true, order: 1 },
    { value: 2, isPopular: true, order: 2 },
    { value: 5, isPopular: true, order: 3 },
    { value: 10, isPopular: true, order: 4 },
    { value: 15, isPopular: true, order: 5 },
    { value: 20, isPopular: true, order: 6 },
    { value: 25, isPopular: true, order: 7 },
    { value: 30, isPopular: true, order: 8 },
    { value: 40, isPopular: true, order: 9 },
    { value: 50, isPopular: true, order: 10 },
    { value: 60, isPopular: false, order: 11 },
    { value: 75, isPopular: false, order: 12 },
    { value: 80, isPopular: false, order: 13 },
    { value: 100, isPopular: true, order: 14 },
    { value: 125, isPopular: false, order: 15 },
    { value: 150, isPopular: false, order: 16 },
    { value: 160, isPopular: false, order: 17 },
    { value: 200, isPopular: false, order: 18 },
    { value: 250, isPopular: false, order: 19 },
    { value: 300, isPopular: false, order: 20 },
    { value: 400, isPopular: false, order: 21 },
    { value: 500, isPopular: false, order: 22 },
    { value: 630, isPopular: false, order: 23 },
    { value: 800, isPopular: false, order: 24 },
    { value: 1000, isPopular: false, order: 25 },
    { value: 0.5, isPopular: false, order: 26 },
    { value: 0.9, isPopular: false, order: 27 },
    { value: 1.7, isPopular: false, order: 28 },
    { value: 2.1, isPopular: false, order: 29 },
    { value: 2.7, isPopular: false, order: 30 },
    { value: 3.2, isPopular: false, order: 31 },
    { value: 3.5, isPopular: false, order: 32 },
    { value: 4, isPopular: false, order: 33 },
    { value: 6, isPopular: false, order: 34 },
    { value: 7, isPopular: false, order: 35 },
    { value: 8, isPopular: false, order: 36 },
    { value: 12, isPopular: false, order: 37 },
    { value: 16, isPopular: false, order: 38 },
    { value: 32, isPopular: false, order: 39 },
    { value: 63, isPopular: false, order: 40 },
  ]

  // Seed Voltage Suggestions
  const voltageValues = [
    { value: 220, isPopular: true, order: 1 },
    { value: 380, isPopular: true, order: 2 },
    { value: 400, isPopular: true, order: 3 },
    { value: 24, isPopular: false, order: 4 },
    { value: 48, isPopular: false, order: 5 },
    { value: 110, isPopular: true, order: 6 },
    { value: 120, isPopular: false, order: 7 },
    { value: 230, isPopular: false, order: 8 },
    { value: 240, isPopular: false, order: 9 },
    { value: 415, isPopular: false, order: 10 },
    { value: 440, isPopular: false, order: 11 },
    { value: 480, isPopular: false, order: 12 },
    { value: 690, isPopular: false, order: 13 },
    { value: 1000, isPopular: false, order: 14 },
    { value: 3300, isPopular: false, order: 15 },
    { value: 6600, isPopular: false, order: 16 },
  ]

  // Seed Phase Suggestions
  const phaseValues = [
    { value: 1, name: 'أحادي (1φ)', isPopular: true, order: 1 },
    { value: 2, name: 'ثنائي (2φ)', isPopular: false, order: 2 },
    { value: 3, name: 'ثلاثي (3φ)', isPopular: true, order: 3 },
  ]

  console.log('Seeding amperage suggestions...')
  for (const amp of amperageValues) {
    await db.amperageSuggestion.upsert({
      where: { value: amp.value },
      update: amp,
      create: amp
    })
  }

  console.log('Seeding voltage suggestions...')
  for (const volt of voltageValues) {
    await db.voltageSuggestion.upsert({
      where: { value: volt.value },
      update: volt,
      create: volt
    })
  }

  console.log('Seeding phase suggestions...')
  for (const phase of phaseValues) {
    await db.phaseSuggestion.upsert({
      where: { value: phase.value },
      update: phase,
      create: phase
    })
  }

  console.log('Done seeding suggestions!')
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
