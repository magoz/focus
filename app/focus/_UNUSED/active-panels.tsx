'use client'

import { Button } from '@/components/ui/button'
import { focusPeriodsAtom, projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { XIcon } from 'lucide-react'
import { Fragment, useEffect, useRef } from 'react'
import {
  ImperativePanelGroupHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle
} from 'react-resizable-panels'

export const ActiveFocus = () => {
  const [projects] = useAtom(projectsAtom)
  const [focusPeriods, setFocusPeriods] = useAtom(focusPeriodsAtom)
  const ref = useRef<ImperativePanelGroupHandle>(null)

  const currentPeriod = focusPeriods.at(-1)
  const activeProjects = currentPeriod
    ? currentPeriod.projects.map(activeProject => {
        const project = projects.find(p => p.id === activeProject.projectId)
        if (!project) throw new Error(`Project with id ${activeProject.projectId} not found`)
        return {
          ...project,
          focus: activeProject.focus
        }
      })
    : []

  const setActiveProjectsFocus = (values: number[]) => {
    setFocusPeriods(prev => {
      return prev.map((period, index) => {
        if (index !== prev.length - 1) return period // Not the current period
        return {
          ...period,
          projects: period.projects.map((project, i) => {
            return {
              ...project,
              focus: values[i]
            }
          })
        }
      })
    })
  }

  const sizes = activeProjects.map(p => p.focus)
  const setGroupSizes = () => {
    if (ref.current) {
      console.log('run')
      ref.current.setLayout(sizes)
      // setSizes(sizes)
    }
  }
  useEffect(() => {
    setGroupSizes()
  }, [])

  // const sizes = activeProjects.map(p => p.focus)
  //

  // const urlStorage = useMemo(() => ({
  //   getItem(name) {
  //     try {
  //       const parsed = JSON.parse(decodeURI(window.location.hash.substring(1)));
  //       return parsed[name] || "";
  //     } catch (error) {
  //       console.error(error);
  //       return "";
  //     }
  //   },
  //   setItem(name, value) {
  //     const encoded = encodeURI(JSON.stringify({
  //       [name]: value
  //     }));
  //   }
  // }), []);

  // const panelGroupStorage = useMemo(() => {
  //   console.log('run memo')
  //   return {
  //     getItem: (name: string) => {
  //       const item = projects.find(project => project.id === name)
  //       if (!item) throw new Error('Item not found')
  //       return item.focus.toString()
  //     },
  //     setItem: (_name: string, value: string) => {
  //       console.log('setItem size name', name)
  //       console.log('setItem value', value)
  //       setProjects(prev => {
  //         return prev.map(project => {
  //           if (project.id !== name) return project
  //           return {
  //             ...project,
  //             focus: Number(value)
  //           }
  //         })
  //       })
  //     }
  //   } satisfies PanelGroupStorage
  // }, [setProjects])

  const removeActiveProject = (id: string) => {
    setFocusPeriods(prev => {
      return prev.map((period, index) => {
        if (index !== prev.length - 1) return period // Not the current period
        return {
          ...period,
          projects: period.projects.filter(p => p.projectId !== id)
        }
      })
    })
  }

  return (
    <section className="flex flex-col gap-4 w-full">
      <h3 className="text-2xl font-bold">Active</h3>

      <div className="w-full">
        <PanelGroup
          ref={ref}
          direction="horizontal"
          onLayout={setActiveProjectsFocus}
          // autoSaveId="active-panels"
          // storage={panelGroupStorage}
        >
          {activeProjects.map(({ id, color, name, focus }, index, arr) => {
            console.log(`focus ${index} ${id}`, focus)
            return (
              <Fragment key={`group-${id}`}>
                <Panel
                  key={id}
                  id={id}
                  // defaultSize={focus}
                  minSize={10}
                  className="relative flex h-16 rounded-xl items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  <span className="font-bold text-white select-none pointer-events-none">
                    {name}
                  </span>
                  <span className="absolute bottom-1 right-1 text-xs font-bold text-white/50 select-none pointer-events-none">
                    {focus.toFixed(0)}
                  </span>
                  <Button
                    className="absolute top-1 left-1 hover:bg-transparent"
                    variant="ghost"
                    onClick={() => removeActiveProject(id)}
                  >
                    <XIcon className="w-4 text-white" />
                  </Button>
                  <span></span>
                </Panel>
                {index !== arr.length - 1 && <PanelResizeHandle className="w-2" />}
              </Fragment>
            )
          })}
        </PanelGroup>
      </div>

      <div className="font-bold">Week 74</div>
    </section>
  )
}
