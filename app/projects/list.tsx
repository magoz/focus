'use client'

import { Button } from '@/components/ui/button'
import { focusPeriodsAtom, projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { ArchiveIcon, TargetIcon } from 'lucide-react'

export const ProjectList = () => {
  const [projects, setProjects] = useAtom(projectsAtom)
  const [, setFocusPeriods] = useAtom(focusPeriodsAtom)

  const activeProjects = projects.filter(project => !project.isArchived)

  const addProjectToFocusPeriod = (projectId: string) => {
    setFocusPeriods(prev => {
      return prev.map((period, index) => {
        if (index !== prev.length - 1) return period // Not the current period
        if (period.projects.find(project => project.projectId === projectId)) return period // already added
        return {
          ...period,
          projects: [
            ...period.projects,
            {
              projectId,
              focus: 50
            }
          ]
        }
      })
    })
  }

  const archiveProject = (id: string) => {
    setProjects(prev => {
      return prev.map(project => {
        return project.id === id ? { ...project, isArchived: true } : project
      })
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {activeProjects.map(({ id, color, name }) => {
        return (
          <div
            key={id}
            className="relative flex w-full h-16 rounded-xl items-center justify-center cursor-pointer"
            style={{ backgroundColor: color }}
          >
            <span className="font-bold select-none pointer-events-none">{name}</span>
            <div className="absolute top-1 right-2 flex gap-2">
              <Button variant="link" onClick={() => addProjectToFocusPeriod(id)} className="p-0">
                <TargetIcon className="w-4 h-4" />
              </Button>

              <Button variant="link" onClick={() => archiveProject(id)} className="p-0">
                <ArchiveIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
