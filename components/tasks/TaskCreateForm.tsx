'use client'

import React, { useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { CreateTaskDTO, TaskPriority, TaskStatus } from '@/types/task'

interface TaskCreateFormProps {
  onSubmit: (data: CreateTaskDTO) => Promise<boolean>
  isLoading?: boolean
}

export function TaskCreateForm({ onSubmit, isLoading }: TaskCreateFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>('TODO')
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM')
  const [dueDate, setDueDate] = useState('')
  const [errors, setErrors] = useState<{ title?: string }>({})

  const validate = () => {
    const newErrors: { title?: string } = {}
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.trim().length < 3) {
      newErrors.title = 'Minimum 3 characters required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const success = await onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      dueDate: dueDate || undefined,
    })

    if (success) {
      setTitle('')
      setDescription('')
      setStatus('TODO')
      setPriority('MEDIUM')
      setDueDate('')
      setErrors({})
    }
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs sticky top-24">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Create Task</h2>
          <p className="text-[11px] text-slate-400">Add an action item to the public board</p>
        </div>
        <span className="p-1 rounded-lg bg-blue-50 text-blue-600">
          <Sparkles className="w-3.5 h-3.5" />
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Input
          label="Title *"
          placeholder="e.g., Set up Prisma connection pooler"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (errors.title) setErrors({})
          }}
          error={errors.title}
        />

        <Textarea
          label="Description"
          placeholder="Acceptance criteria or implementation notes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="grid grid-cols-2 gap-2.5">
          <Select
            label="Initial Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            options={[
              { label: 'To Do', value: 'TODO' },
              { label: 'In Progress', value: 'IN_PROGRESS' },
              { label: 'Done', value: 'DONE' },
            ]}
          />

          <Select
            label="Priority Level"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            options={[
              { label: 'Low', value: 'LOW' },
              { label: 'Medium', value: 'MEDIUM' },
              { label: 'High', value: 'HIGH' },
              { label: 'Urgent', value: 'URGENT' },
            ]}
          />
        </div>

        <Input
          type="date"
          label="Target Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all duration-150 flex items-center justify-center gap-1.5 active:scale-[0.98] disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{isLoading ? 'Creating Task...' : 'Publish Task'}</span>
        </button>
      </form>
    </div>
  )
}
