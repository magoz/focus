import { Button } from '@/components/ui/button'
import { ProjectWithFocus, PeriodWithProjects } from '@/lib/types'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import { ProjectsPopover } from './projects-popover'
import { useDebounce, useHover } from '@uidotdev/usehooks'
import { CheckIcon, XIcon } from 'lucide-react'
import { FocusPeriodDatePicker } from './period-date-picker'
import { useFocus } from '@/lib/use-focus'
import { useCallback, useEffect, useRef, useState } from 'react'
import { isEqual } from 'lodash'

const Project = ({
  project,
  isLast,
  periodId
}: {
  project: ProjectWithFocus
  isLast: boolean
  periodId: string
}) => {
  const { removeProjectFromPeriod } = useFocus()
  const { id, name, focus, color } = project
  const [ref, hovering] = useHover()

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
          onClick={() => removeProjectFromPeriod({ periodId, projectId: id })}
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
      {!isLast && (
        <PanelResizeHandle
          // hitAreaMargins={{ coarse: 10, fine: 10 }}
          className="w-[1px]"
          style={{ backgroundColor: color }}
        />
      )}
    </>
  )
}

type Props = {
  focusPeriodProjects: PeriodWithProjects
}

export const ActivePeriod = ({ focusPeriodProjects }: Props) => {
  const { id, projects } = focusPeriodProjects
  const [localFocusValues, setLocalFocusValues] = useState<number[]>(
    focusPeriodProjects.projects.map(p => p.focus)
  )
  const debouncedFocusValues = useDebounce(localFocusValues, 300)
  const panelGroupHasChangedRef = useRef(false)
  const { updateActivePeriodFocus, createPeriod, updatePeriod } = useFocus()

  const completeActiveFocus = useCallback(() => {
    updatePeriod({ id, isActive: false })
    createPeriod()
  }, [id, updatePeriod, createPeriod])

  const updateAppFocusValues = useCallback(() => {
    updateActivePeriodFocus({ periodId: id, values: debouncedFocusValues })
  }, [id, debouncedFocusValues, updateActivePeriodFocus])

  useEffect(() => {
    if (!panelGroupHasChangedRef.current) return
    updateAppFocusValues()
  }, [debouncedFocusValues, updateAppFocusValues])

  const handleLayoutChange = useCallback(
    (values: number[]) => {
      // We don't want to trigger an update if the values are the same.
      // Especially we want to avoid triggering an update on load, which onLayout does.
      // So we only update if the values are different.
      if (isEqual(localFocusValues, values)) return

      // We also track if the panelGroup has changed, so we can avoid triggering an update
      panelGroupHasChangedRef.current = true

      setLocalFocusValues(() => values)
    },
    [localFocusValues]
  )

  return (
    <div>
      <div className="flex justify-center text-lg font-bold text-foreground/50 mb-12">
        <FocusPeriodDatePicker periodId={id} />
      </div>
      <div className="flex w-full gap-4">
        {projects.length > 0 ? (
          <PanelGroup
            direction="horizontal"
            onLayout={handleLayoutChange}
            // autoSaveId="active-panels"
            // storage={panelGroupStorage}
          >
            {projects.map((project, index, arr) => {
              const isLast = index === arr.length - 1

              // There is a race between the panelGroup and the focus values
              // We need to make sure that the focus value is not undefined
              // Otherwise we get the error:
              // `Cannot update a component while rendering a different component`
              const focus = localFocusValues[index] ?? 50

              const projectWithLocalFocus = { ...project, focus }
              return (
                <Project
                  key={project.id}
                  project={projectWithLocalFocus}
                  isLast={isLast}
                  periodId={id}
                />
              )
            })}
          </PanelGroup>
        ) : (
          <div className="flex w-full h-10 border border-dashed border-foreground/30 rounded-full" />
        )}
      </div>
      <div className="flex gap-4 w-full justify-center mt-8">
        <ProjectsPopover />
        <Button
          variant="outline"
          size="xl"
          onClick={completeActiveFocus}
          disabled={projects.length === 0}
          className="aspect-square h-12 p-0 rounded-full hover:bg-background"
        >
          <CheckIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
