'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import {
  Users,
  CheckSquare,
  Shield,
  Layers,
  ArrowRight,
  Database,
  LogIn,
  UserPlus,
  Kanban,
  UserCheck,
  Zap,
} from 'lucide-react'

export default function HomePage() {
  const { user, isLoading } = useAuth()

  return (
    <div className="space-y-10 py-2">
      {/* 1. Asymmetric Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Hero Main Block (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                Assignment 2 Workspace
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Database className="w-3 h-3 text-emerald-600" />
                Supabase Auth & PostgreSQL
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Executive{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Task & Team Management
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              An enterprise-grade collaboration platform. Create organizations, invite peers by email, assign tasks with role-based governance, and track delivery on dynamic Kanban boards.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
            {isLoading ? (
              <div className="h-10 w-36 bg-slate-100 rounded-xl animate-pulse" />
            ) : user ? (
              <Link
                href="/teams"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-500/25 transition active:scale-[0.98]"
              >
                <span>Enter Teams Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-500/25 transition active:scale-[0.98]"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-blue-50/50 border border-blue-200 text-blue-700 font-semibold text-xs rounded-xl shadow-2xs transition active:scale-[0.98]"
                >
                  <UserPlus className="w-4 h-4 text-blue-600" />
                  <span>Create Account</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right Feature Spotlight Card (5 cols - Fresh, Radiant Indigo Gradient) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl shadow-indigo-500/20 relative overflow-hidden">
          {/* Subtle decorative glow circles */}
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative space-y-4">
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20 shadow-sm">
              <Zap className="w-5 h-5 fill-amber-300/30" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-100 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                Core Governance
              </span>
              <h2 className="text-2xl font-bold mt-2.5 tracking-tight text-white">Role-Based Authorization</h2>
            </div>
            <p className="text-xs text-blue-50/90 leading-relaxed font-normal">
              Enforcing strict operational rules: Only team Owners can invite or remove members and alter team scopes. Task deletion is strictly restricted to Creators, Assignees, or Team Owners.
            </p>
          </div>

          <div className="relative pt-6 border-t border-white/15 grid grid-cols-2 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
              <div className="text-xl font-black text-white">100%</div>
              <div className="text-[10px] text-blue-100 font-medium">REST CRUD APIs</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
              <div className="text-xl font-black text-emerald-300">Verified</div>
              <div className="text-[10px] text-blue-100 font-medium">Session Guard</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Breakaway Bento Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Bento Item 1: Team Organization (4 cols) */}
        <div className="md:col-span-4 p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Multi-Team Organizations</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Join multiple team scopes simultaneously. Toggle contexts seamlessly and add colleagues directly via their registered email address.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600">
            <span>Invite via Email</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Bento Item 2: Kanban & Task Delivery (5 cols) */}
        <div className="md:col-span-5 p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Kanban className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Visual Kanban & Board Lifecycle</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Organize deliverables across <strong>To Do</strong>, <strong>In Progress</strong>, and <strong>Done</strong> phases. Assign specific team members with target due dates and priority tags.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
            <span>Dynamic Status Cycle</span>
            <CheckSquare className="w-3 h-3" />
          </div>
        </div>

        {/* Bento Item 3: Ownership Protocol (3 cols) */}
        <div className="md:col-span-3 p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Owner Privileges</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Auto-assigned Owner permissions upon creation with sole authorization to edit or disband teams.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Owner Role</span>
          </div>
        </div>
      </div>

      {/* 3. Logged-in User Live Banner */}
      {user && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-blue-500/25">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Logged in as {user.name} ({user.email})</p>
              <p className="text-[11px] text-slate-500">Your session is authenticated with Supabase Auth</p>
            </div>
          </div>
          <Link
            href="/teams"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/25 transition self-start sm:self-auto active:scale-[0.98]"
          >
            Go to Your Teams <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  )
}