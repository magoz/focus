'use client'

import { projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { PointerEvent, useState } from 'react'

// - resizeStart
// - resizeEnd
// - move

const calculateDraggingProjectFocus = (e: PointerEvent<HTMLDivElement>) => {
  const mousePosition = e.clientX
  const rect = e.currentTarget.getBoundingClientRect()
  const rectX = mousePosition - rect.left
  const xPercentage = (rectX / rect.width) * 100
  return xPercentage
}

// const MIN_SIZE = 10
// const resizeStart = () => {
//
// }

export const Active = () => {
  const [projects, setProjects] = useAtom(projectsAtom)
  const [draggingProjectId, setDraggingProjectId] = useState<string | null>(null)

  const activeProjects = projects.filter(project => project.status === 'ACTIVE')

  const updateProjectFocus = (newFocus: number) => {
    setProjects(prev => {
      if (!draggingProjectId === null) return prev

      const draggingProject = prev.find(project => project.id === draggingProjectId)
      if (!draggingProject) return prev

      const activeNonDraggedProjects = prev.filter(
        project => project.status === 'ACTIVE' && project.id !== draggingProjectId
      )
      const delta = newFocus - draggingProject.focus
      const deltaPerNonDraggedProject =
        activeNonDraggedProjects.length === 0 ? 0 : delta / activeNonDraggedProjects.length

      return prev.map(project => {
        return {
          ...project,
          focus:
            project.id === draggingProjectId ? newFocus : project.focus - deltaPerNonDraggedProject
        }
      })
    })
  }

  return (
    <section className="flex flex-col gap-4 w-full">
      <h3 className="text-2xl font-bold">Active</h3>

      <div
        className="flex w-full gap-2"
        onPointerMove={e => {
          const xPercentage = calculateDraggingProjectFocus(e)
          updateProjectFocus(xPercentage)
        }}
        onPointerUp={() => {
          setDraggingProjectId(null)
        }}
      >
        {activeProjects.map(({ id, color, name, focus }) => {
          return (
            <div
              key={id}
              className="flex w-1/2 h-16 rounded-xl items-center justify-center"
              style={{ backgroundColor: color, width: `${focus}%` }}
              onPointerDown={() => setDraggingProjectId(id)}
            >
              <span className="font-bold text-white select-none pointer-events-none">{name}</span>
            </div>
          )
        })}
      </div>

      {/* <div className="w-full h-2 bg-zinc-200 rounded"></div> */}
      <div className="font-bold">Week 74</div>
    </section>
  )
}
