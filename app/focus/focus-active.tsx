import { Button } from '@/components/ui/button'
import { focusPeriodsAtom } from '@/lib/local-state'
import { FocusPeriodFullProject, FocusPeriodWithProjects } from '@/lib/types'
import { useAtom } from 'jotai'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import { FocusPeriodActions } from './period-actions'
import { DateRange } from 'react-day-picker'
import { ProjectsPopover } from './projects-popover'
import { useHover } from '@uidotdev/usehooks'
import { CheckIcon, XIcon } from 'lucide-react'

const Project = ({
  project,
  isLast,
  periodId
}: {
  project: FocusPeriodFullProject
  isLast: boolean
  periodId: string
}) => {
  const [, setFocusPeriods] = useAtom(focusPeriodsAtom)
  const { id, name, focus, color } = project
  const [ref, hovering] = useHover()

  const removeActiveProject = () => {
    setFocusPeriods(prev => {
      return prev.map(period => {
        if (period.id !== periodId) return period
        return {
          ...period,
          projects: period.projects.filter(p => p.projectId !== id)
        }
      })
    })
  }

  return (
    <>
      <Panel
        key={id}
        id={id}
        defaultSize={focus}
        minSize={10}
        className="relative flex h-12 first:rounded-tl-full first:rounded-bl-full last:rounded-tr-full last:rounded-br-full items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Button
          ref={ref}
          variant="icon"
          onClick={removeActiveProject}
          className="flex gap-2 select-none text-foreground font-bold"
        >
          {hovering ? (
            <XIcon className="w-40 h-4" />
          ) : (
            <>
              <span>{name}</span>
              <span className="opacity-50">{focus.toFixed(0)}</span>
            </>
          )}
        </Button>
      </Panel>
      {!isLast && <PanelResizeHandle className="w-0" />}
    </>
  )
}

type Props = {
  focusPeriodProjects: FocusPeriodWithProjects
}

export const FocusActive = ({ focusPeriodProjects }: Props) => {
  const { id, projects } = focusPeriodProjects
  const [, setFocusPeriods] = useAtom(focusPeriodsAtom)

  const setActiveProjectsFocus = (values: number[]) => {
    setFocusPeriods(prev => {
      return prev.map(period => {
        if (period.id !== id) return period
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

  const updateDates = (dates: DateRange | undefined) => {
    setFocusPeriods(prev => {
      return prev.map(period => {
        if (period.id !== id) return period
        return {
          ...period,
          periodStart: dates?.from ? dates.from.toISOString() : '',
          periodEnd: dates?.to ? dates.to.toISOString() : undefined
        }
      })
    })
  }

  return (
    <div className="mt-16">
      <div className="w-full">
        <PanelGroup
          direction="horizontal"
          onLayout={setActiveProjectsFocus}
          // autoSaveId="active-panels"
          // storage={panelGroupStorage}
        >
          {projects.map((project, index, arr) => {
            const isLast = index === arr.length - 1
            return <Project key={project.id} project={project} isLast={isLast} periodId={id} />
          })}
        </PanelGroup>
      </div>
      <div className="flex gap-4 w-full justify-center mt-4">
        <Button variant="outline" size="xl">
          <CheckIcon className="w-4 h-4" />
        </Button>
        <ProjectsPopover />
      </div>
    </div>
  )
}
