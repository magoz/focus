'use client'

import { projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

export const ActiveFocus = () => {
  const [projects, setProjects] = useAtom(projectsAtom)

  const activeProjects = projects.filter(project => project.status === 'ACTIVE')

  const updateFocus = (values: number[]) => {
    setProjects(prev => {
      return prev.map((project, index) => {
        if (project.status !== 'ACTIVE') return project
        return {
          ...project,
          focus: values[index]
        }
      })
    })
  }

  return (
    <section className="flex flex-col gap-4 w-full">
      <h3 className="text-2xl font-bold">Active</h3>

      <div className="w-full">
        <PanelGroup direction="horizontal" onLayout={updateFocus}>
          {activeProjects.map(({ id, color, name, focus }, index, arr) => {
            return (
              <>
                <Panel
                  defaultSize={30}
                  minSize={10}
                  id={id}
                  key={id}
                  className="flex w-1/2 h-16 rounded-xl items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  <span className="font-bold text-white select-none pointer-events-none">
                    {name}
                  </span>
                </Panel>
                {index !== arr.length - 1 && <PanelResizeHandle className="w-2" />}
              </>
            )
          })}
        </PanelGroup>
      </div>

      <div className="font-bold">Week 74</div>
    </section>
  )
}
