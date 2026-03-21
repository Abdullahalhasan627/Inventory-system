import { PrismaClient } from '@prisma/client'

// Always create a new client to ensure latest schema is used
export const db = new PrismaClient({
  log: ['query'],
})
