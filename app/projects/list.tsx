'use client'

import { projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { ProjectInList } from './project-in-list'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createId } from '@paralleldrive/cuid2'
import { pickRandomColor } from '@/lib/defaults'
import { Project } from '@/lib/types'

export const ProjectList = () => {
  const [projects, setProjects] = useAtom(projectsAtom)
  const activeProjects = projects.filter(project => !project.isArchived && !project.isDeleted)

  const addProject = () => {
    const newProject = {
      id: createId(),
      name: 'New Project',
      color: pickRandomColor(),
      isArchived: false
    } satisfies Project

    setProjects(prev => {
      return [...prev, newProject]
    })
  }

  return (
    <section>
      <div className="flex gap-4 items-center mb-4">
        <h3 className="text-2xl font-bold">Projects</h3>
        <Button variant="link" onClick={addProject} className="p-0">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {activeProjects.map(project => {
          return <ProjectInList project={project} key={project.id} />
        })}
      </div>
    </section>
  )
}
