import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // 1. Đăng ký tài khoản trên Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          name: name.trim(),
        },
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Failed to create user account' }, { status: 500 })
    }

    // 2. Đồng bộ người dùng vào Prisma Database
    const user = await prisma.user.upsert({
      where: { email: email.trim().toLowerCase() },
      update: {
        name: name.trim(),
      },
      create: {
        id: authData.user.id,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password || '',
      },
    })

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        session: authData.session,
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Register API Error:', error)
    const message = error instanceof Error ? error.message : 'Server error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
