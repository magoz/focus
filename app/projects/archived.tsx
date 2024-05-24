'use client'

import { ProjectInList } from './project-in-list'
import { useFocus } from '@/lib/use-focus'

export const ArchivedProjects = () => {
  const { projects } = useFocus()
  const archivedProjects = projects.filter(project => project.isArchived && !project.isDeleted)

  return (
    <section>
      <div className="flex gap-4 items-center mb-4 select-none">
        <h3 className="text-2xl font-bold">Archived</h3>
      </div>

      <div className="flex flex-col gap-4">
        {archivedProjects.map(project => {
          return <ProjectInList project={project} key={project.id} />
        })}
      </div>
    </section>
  )
}
