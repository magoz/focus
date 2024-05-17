'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { pickRandomColor, projectsAtom } from '@/lib/local-state'
import { createId } from '@paralleldrive/cuid2'
import { useAtom } from 'jotai'
import { useState } from 'react'

export const AddProject = () => {
  const [input, setInput] = useState('')
  const [, setProjects] = useAtom(projectsAtom)

  const addProject = (name: string) => {
    const newProject = {
      id: createId(),
      name,
      status: 'INACTIVE',
      focus: 50,
      color: pickRandomColor(),
      isArchived: false
    } satisfies Project

    setProjects(prev => {
      return [...prev, newProject]
    })
  }

  const onAdd = () => {
    addProject(input)
    setInput('')
  }

  return (
    <section className="flex gap-4">
      <Input value={input} onChange={e => setInput(e.currentTarget.value)} />
      <Button onClick={onAdd}>Add Project</Button>
    </section>
  )
}
