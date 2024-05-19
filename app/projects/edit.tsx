'use client'

import { Input } from '@/components/ui/input'
import { Project } from '@/lib/types'
import { useEditProject } from '@/lib/use-projects'
import { useState } from 'react'

type Props = {
  project: Project
}

export const EditProject = ({ project }: Props) => {
  const [inputName, setInputName] = useState(project.name)
  const [inputColor, setInputColor] = useState(project.color)
  const { editProject } = useEditProject()

  const onEdit = () => {
    editProject({
      ...project,
      name: inputName,
      color: inputColor
    })
  }

  const onEditColor = (value: string) => {
    setInputColor(value)
    if (value === '') return

    editProject({
      ...project,
      color: value
    })
  }

  const onEditName = (value: string) => {
    console.log('value', value, value.length)
    setInputName(value)
    if (value === '') return

    editProject({
      ...project,
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
