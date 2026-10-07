import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // 1. Đăng nhập qua Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 401 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
    }

    // 2. Đảm bảo user tồn tại trong Prisma
    let prismaUser = await prisma.user.findUnique({
      where: { email: authData.user.email! },
    })

    if (!prismaUser) {
      prismaUser = await prisma.user.create({
        data: {
          id: authData.user.id,
          email: authData.user.email!,
          name: authData.user.user_metadata?.name || authData.user.email!.split('@')[0],
          password: '',
        },
      })
    }

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
      },
      session: authData.session,
    })
  } catch (error: unknown) {
    console.error('Login API Error:', error)
    const message = error instanceof Error ? error.message : 'Server error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
