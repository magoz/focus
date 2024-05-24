'use client'

import { Input } from '@/components/ui/input'
import { Project } from '@/lib/types'
import { useFocus } from '@/lib/use-focus'
import { useState } from 'react'

type Props = {
  project: Project
}

export const EditProject = ({ project }: Props) => {
  const [inputName, setInputName] = useState(project.name)
  const [inputColor, setInputColor] = useState(project.color)
  const { updateProject } = useFocus()
  const { id } = project

  const onEditColor = (value: string) => {
    setInputColor(value)
    if (value === '') return

    updateProject({
      id,
      color: value
    })
  }

  const onEditName = (value: string) => {
    setInputName(value)
    if (value === '') return

    updateProject({
      id,
      name: value
    })
  }

  return (
    <section className="flex gap-4">
      <Input value={inputName} onChange={e => onEditName(e.currentTarget.value)} />
      <input
        type="color"
        value={inputColor}
        onChange={e => onEditColor(e.target.value)}
        className="min-w-10 min-h-10"
      />
    </section>
  )
}
