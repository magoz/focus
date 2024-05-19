'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { pickRandomColor } from '@/lib/defaults'
import { projectsAtom } from '@/lib/local-state'
import { Project } from '@/lib/types'
import { createId } from '@paralleldrive/cuid2'
import { useAtom } from 'jotai'
import { useState } from 'react'

export const AddProject = () => {
  const [input, setInput] = useState('')
  const [color, setColor] = useState(pickRandomColor())
  const [, setProjects] = useAtom(projectsAtom)

  const addProject = (name: string) => {
    const newProject = {
      id: createId(),
      name,
      color,
      isArchived: false
    } satisfies Project

    setProjects(prev => {
      return [...prev, newProject]
    })
  }

  const onAdd = () => {
    addProject(input)
    setInput('')
    setColor(pickRandomColor())
  }

  return (
    <section className="flex gap-4">
      <Input value={input} onChange={e => setInput(e.currentTarget.value)} />
      <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
        className="min-w-10 min-h-10"
      />
      <Button onClick={onAdd}>Add Project</Button>
    </section>
  )
}
