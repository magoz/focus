'use client'

import { projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'

export const ArchivedProjects = () => {
  const [projects, setProjects] = useAtom(projectsAtom)
  const archivedProjects = projects.filter(project => project.isArchived)

  const unarchiveProject = (id: string) => {
    setProjects(prev => {
      return prev.map(project => {
        return project.id === id ? { ...project, isArchived: false } : project
      })
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {archivedProjects.map(({ id, color, name }) => {
        return (
          <div
            key={id}
            className="flex w-full h-16 rounded-xl items-center justify-center cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => unarchiveProject(id)}
          >
            <span className="font-bold select-none pointer-events-none">{name}</span>
          </div>
        )
      })}
    </div>
  )
}
