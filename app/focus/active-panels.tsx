'use client'

import { Button } from '@/components/ui/button'
import { projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { CrossIcon, XIcon } from 'lucide-react'
import { Fragment, useEffect, useRef } from 'react'
import {
  ImperativePanelGroupHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle
} from 'react-resizable-panels'

export const ActiveFocus = () => {
  const [projects, setProjects] = useAtom(projectsAtom)
  const ref = useRef<ImperativePanelGroupHandle>(null)

  console.log('projects', projects)

  const activeProjects = projects.filter(project => project.status === 'ACTIVE')

  const setSizes = (values: number[]) => {
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

  const setItemSize = (id: string, value: number) => {
    setProjects(prev => {
      return prev.map(project => {
        if (project.id !== id) return project
        return {
          ...project,
          focus: value
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

  const toggleProject = (id: string) => {
    setProjects(prev => {
      return prev.map(project => {
        if (project.id !== id) return project
        return {
          ...project,
          status: project.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
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
          onLayout={setSizes}
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
                    onClick={() => toggleProject(id)}
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
