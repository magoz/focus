import { Button } from '@/components/ui/button'
import { focusPeriodsAtom } from '@/lib/local-state'
import { FocusPeriodWithProjects } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { useAtom } from 'jotai'
import { XIcon } from 'lucide-react'
import { Fragment, useEffect, useRef } from 'react'
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
  ImperativePanelGroupHandle
} from 'react-resizable-panels'

type Props = {
  focusPeriodProjects: FocusPeriodWithProjects
}

export const FocusActive = ({ focusPeriodProjects }: Props) => {
  const { projects, periodStart, periodEnd } = focusPeriodProjects
  const [, setFocusPeriods] = useAtom(focusPeriodsAtom)
  const ref = useRef<ImperativePanelGroupHandle>(null)

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

  const sizes = projects.map(p => p.focus)
  const setGroupSizes = () => {
    if (ref.current) {
      ref.current.setLayout(sizes)
    }
  }
  useEffect(() => {
    setGroupSizes()
  }, [])

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
    <div>
      <div className="mb-2 text-slate-500">
        <span className="text-lg font-bold">
          {formatDate(periodStart)}
          {periodEnd && ` - ${formatDate(periodEnd)}`}
        </span>
      </div>

      <div className="w-full">
        <PanelGroup
          ref={ref}
          direction="horizontal"
          onLayout={setActiveProjectsFocus}
          // autoSaveId="active-panels"
          // storage={panelGroupStorage}
        >
          {projects.map(({ id, color, name, focus }, index, arr) => {
            return (
              <Fragment key={`group-${id}`}>
                <Panel
                  key={id}
                  id={id}
                  defaultSize={focus}
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
    </div>
  )
}