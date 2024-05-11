'use client'

import { projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'

export const ProjectList = () => {
  const [projects] = useAtom(projectsAtom)
  return (
    <div className="flex flex-col gap-4">
      {projects.map(({ id, color, name }) => {
        return (
          <div
            key={id}
            className="flex w-full h-16 rounded-xl items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="font-bold text-white select-none pointer-events-none">{name}</span>
          </div>
        )
      })}
    </div>
  )
}
