'use client'

import { focusPeriodsAtom, projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'

export const ProjectList = () => {
  const [projects] = useAtom(projectsAtom)
  const [, setFocusPeriods] = useAtom(focusPeriodsAtom)

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

  return (
    <div className="flex flex-col gap-4">
      {projects.map(({ id, color, name }) => {
        return (
          <div
            key={id}
            className="flex w-full h-16 rounded-xl items-center justify-center cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => addProjectToFocusPeriod(id)}
          >
            <span className="font-bold text-white select-none pointer-events-none">{name}</span>
          </div>
        )
      })}
    </div>
  )
}
