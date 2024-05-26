'use client'

import { ProjectInList } from './project-in-list'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFocus } from '@/lib/use-focus'

export const ProjectList = () => {
  const { projects, createProject } = useFocus()
  const activeProjects = projects.filter(project => !project.isArchived && !project.isDeleted)

  return (
    <section>
      <div className="flex gap-2 items-center justify-center mb-4 select-none">
        <h3 className="text-2xl font-bold">Projects</h3>
        <Button variant="link" onClick={createProject} className="p-0">
          <PlusIcon className="w-5 h-5" />
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
