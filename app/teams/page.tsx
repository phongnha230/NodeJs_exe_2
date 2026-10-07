'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { teamService } from '@/services/team.service'
import { Team } from '@/types/team'
import { Users, Plus, Shield, ArrowRight, AlertCircle, LogIn } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

export default function TeamsDashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Create Team Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [newTeamDesc, setNewTeamDesc] = useState('')
  const [creating, setCreating] = useState(false)

  const fetchTeams = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const data = await teamService.getMyTeams()
      setTeams(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load teams'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading && !user) {
      setLoading(false)
      return
    }
    if (user) {
      fetchTeams()
    }
  }, [user, authLoading, fetchTeams])

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTeamName.trim()) return

    setCreating(true)
    try {
      const created = await teamService.createTeam({
        name: newTeamName.trim(),
        description: newTeamDesc.trim() || undefined,
      })
      setIsCreateOpen(false)
      setNewTeamName('')
      setNewTeamDesc('')
      // Chuyển hướng ngay vào trang team vừa tạo
      router.push(`/teams/${created.id}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create team'
      alert(msg)
    } finally {
      setCreating(false)
    }
  }

  // Nếu chưa đăng nhập
  if (!authLoading && !user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
          <Shield className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Authentication Required</h2>
        <p className="text-xs text-slate-500 mb-6">
          According to Assignment 2 requirements, all team and task management features require a logged-in account.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-xs rounded-xl shadow-md shadow-blue-500/25 transition active:scale-[0.98]"
        >
          <LogIn className="w-4 h-4" />
          Sign In to Continue
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
              Multi-tenant Collaboration
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Teams Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your organizations, collaborate with team members, and oversee assigned tasks.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 text-xs gap-1.5 self-start sm:self-auto border-0">
          <Plus className="w-3.5 h-3.5" />
          Create Team
        </Button>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Team Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs animate-pulse space-y-3">
              <div className="w-24 h-5 bg-slate-200 rounded-md" />
              <div className="w-full h-4 bg-slate-100 rounded-md" />
              <div className="w-1/2 h-4 bg-slate-100 rounded-md" />
            </div>
          ))}
        </div>
      ) : teams.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 shadow-xs">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6 stroke-[1.8]" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">No teams joined yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-5">
            Create your first team to become its Owner and start inviting members to work together!
          </p>
          <Button onClick={() => setIsCreateOpen(true)} size="sm">
            <Plus className="w-3.5 h-3.5 mr-1" />
            Create Your First Team
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => {
            const isOwner = team.ownerId === user?.id
            return (
              <Link
                key={team.id}
                href={`/teams/${team.id}`}
                className="group p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isOwner
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}
                    >
                      {isOwner ? '👑 Owner' : 'Member'}
                    </span>

                    <span className="text-[11px] text-slate-400 font-medium">
                      {team._count?.members || 1} member{team._count?.members === 1 ? '' : 's'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {team.name}
                  </h3>

                  {team.description ? (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {team.description}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400 italic mt-1">No description provided</p>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-700">
                    {team._count?.tasks || 0} active task{team._count?.tasks === 1 ? '' : 's'}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                    Enter Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Create Team Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Team"
        description="You will automatically become the Owner of this team."
      >
        <form onSubmit={handleCreateTeam} className="space-y-4">
          <Input
            label="Team Name *"
            placeholder="e.g. Frontend Engineering, Product Squad"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            required
          />

          <Textarea
            label="Team Description (Optional)"
            placeholder="Brief scope of work or project goals..."
            value={newTeamDesc}
            onChange={(e) => setNewTeamDesc(e.target.value)}
            rows={3}
          />

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={creating}>
              Create Team
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
