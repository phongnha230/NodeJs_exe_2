import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export async function getAuthenticatedUser(request?: Request): Promise<User | null> {
  try {
    const supabase = await createClient()

    // 1. Kiểm tra session qua Cookie hoặc Auth Header nếu có
    let supabaseUser = null

    if (request) {
      const authHeader = request.headers.get('Authorization')
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7)
        const { data: { user } } = await supabase.auth.getUser(token)
        supabaseUser = user
      }
    }

    if (!supabaseUser) {
      const { data: { user } } = await supabase.auth.getUser()
      supabaseUser = user
    }

    if (!supabaseUser || !supabaseUser.email) {
      return null
    }

    // 2. Tìm hoặc đồng bộ user vào database Prisma
    let prismaUser = await prisma.user.findFirst({
      where: {
        OR: [
          { id: supabaseUser.id },
          { email: supabaseUser.email },
        ],
      },
    })

    if (!prismaUser) {
      prismaUser = await prisma.user.create({
        data: {
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.name || supabaseUser.email.split('@')[0],
          password: '',
        },
      })
    }

    return prismaUser
  } catch (error) {
    console.error('Error getting authenticated user:', error)
    return null
  }
}
