'use client'

import { projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { ProjectInList } from './project-in-list'

export const ProjectList = () => {
  const [projects] = useAtom(projectsAtom)
  const activeProjects = projects.filter(project => !project.isArchived && !project.isDeleted)

  return (
    <div className="flex flex-col gap-4">
      {activeProjects.map(project => {
        return <ProjectInList project={project} key={project.id} />
      })}
    </div>
  )
}
