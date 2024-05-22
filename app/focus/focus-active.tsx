import { Button } from '@/components/ui/button'
import { focusPeriodsAtom } from '@/lib/local-state'
import { FocusPeriodFullProject, FocusPeriodWithProjects } from '@/lib/types'
import { useAtom } from 'jotai'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import { DateRange } from 'react-day-picker'
import { ProjectsPopover } from './projects-popover'
import { useHover } from '@uidotdev/usehooks'
import { CheckIcon, XIcon } from 'lucide-react'
import { createId } from '@paralleldrive/cuid2'
import { add } from 'date-fns'
import { toDayString } from '@/lib/utils'
import { getNextFocusPeriod } from './utils'
import { FocusPeriodDatePicker } from './period-date-picker'

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
        className="relative flex h-10 first:rounded-tl-full first:rounded-bl-full last:rounded-tr-full last:rounded-br-full items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Button
          ref={ref}
          variant="icon"
          onClick={removeActiveProject}
          className="flex gap-2 select-none text-foreground font-bold truncate"
        >
          {hovering ? (
            <XIcon className="w-40 h-4" />
          ) : (
            <>
              <span className="truncate">{name}</span>
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
  const { id, projects, periodStart, periodEnd } = focusPeriodProjects
  const [periods, setFocusPeriods] = useAtom(focusPeriodsAtom)

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
        const periodStart = dates?.from ? toDayString(dates.from) : toDayString(new Date())
        return {
          ...period,
          periodStart,
          periodEnd: dates?.to ? toDayString(dates.to) : periodStart
        }
      })
    })
  }

  const addFocusPeriod = () => {
    setFocusPeriods(prev => {
      return [
        ...prev,
        {
          id: createId(),
          isActive: true,
          periodStart: toDayString(new Date()),
          periodEnd: toDayString(add(new Date(), { days: 7 })),
          projects: []
        }
      ]
    })
  }

  const completeActiveFocus = () => {
    setFocusPeriods(prev => {
      const { periodStart: nextPeriodStart, periodEnd: nextPeriodEnd } = getNextFocusPeriod(periods)
      return [
        ...prev.map(period => {
          if (period.id !== id) return period
          return {
            ...period,
            isActive: false
          }
        }),
        {
          id: createId(),
          isActive: true,
          periodStart: toDayString(nextPeriodStart),
          periodEnd: toDayString(nextPeriodEnd),
          projects: []
        }
      ]
    })
  }

  // const isPeriodDaily = isSameDay(periodStart, periodEnd)
  // const { periodStart: nextPeriodStart, periodEnd: nextPeriodEnd } = getNextFocusPeriod(periods)

  return (
    <div>
      {/* <div className="flex justify-center text-lg font-bold text-slate-500 mb-8"> */}
      {/*   {toDayString(periodStart)} */}
      {/*   {!isPeriodDaily && ` - ${toDayString(periodEnd)}`} */}
      {/* </div> */}

      {/* <div className="flex justify-center text-lg font-bold text-slate-500 mb-8"> */}
      {/*   {formatDay(nextPeriodStart)} */}
      {/*   {!isPeriodDaily && ` - ${formatDay(nextPeriodEnd)}`} */}
      {/* </div> */}

      <div className="flex justify-center text-lg font-bold text-slate-500 mb-8">
        <FocusPeriodDatePicker
          from={new Date(periodStart)}
          to={new Date(periodEnd)}
          updateDates={updateDates}
        />
      </div>
      <div className="flex w-full gap-4">
        {/* {projects.length > 0 && ( */}
        {/*   <Button */}
        {/*     variant="outline" */}
        {/*     size="xl" */}
        {/*     onClick={completeActiveFocus} */}
        {/*     className="aspect-square h-12 p-0 rounded-full" */}
        {/*   > */}
        {/*     <CheckIcon className="w-4 h-4" /> */}
        {/*   </Button> */}
        {/* )} */}

        {projects.length > 0 ? (
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
        ) : (
          <div className="flex w-full h-10 border border-dashed border-foreground/30 rounded-full" />
        )}

        {/* <ProjectsPopover /> */}
      </div>
      <div className="flex gap-4 w-full justify-center mt-8">
        <ProjectsPopover />
        {projects.length > 0 && (
          <Button
            variant="outline"
            size="xl"
            onClick={completeActiveFocus}
            className="aspect-square h-12 p-0 rounded-full"
          >
            <CheckIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
