interface VerifiedMember {
  id: string
  telegram: string
  twitter?: string
  email: string
  website?: string
  created_at: string
  updated_at: string
}

export const useVerified = () => {
  const getVerifiedMembers = async (): Promise<VerifiedMember[]> => {
    try {
      const response = await $fetch('/api/verified')
      return response
    } catch (error) {
      console.error('Failed to fetch verified members:', error)
      return []
    }
  }

  return {
    getVerifiedMembers
  }
}