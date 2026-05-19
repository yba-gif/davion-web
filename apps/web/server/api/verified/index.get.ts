import { db } from '~/server/utils/db'
import { verified } from '@base1/database'

export default defineEventHandler(async () => {
  try {
    const verifiedMembers = await db.select().from(verified)
    return verifiedMembers
  } catch (error) {
    console.error('Failed to fetch verified members:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch verified members'
    })
  }
})