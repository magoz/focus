import { Button } from '@/components/ui/button'
import { ProjectWithFocus, PeriodWithProjects } from '@/lib/types'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import { ProjectsPopover } from './projects-popover'
import { useHover } from '@uidotdev/usehooks'
import { CheckIcon, XIcon } from 'lucide-react'
import { FocusPeriodDatePicker } from './period-date-picker'
import { useFocus } from '@/lib/use-focus'

const Project = ({
  project,
  isLast,
  periodId
}: {
  project: ProjectWithFocus
  isLast: boolean
  periodId: string
}) => {
  const { removeProjectFromPeriod: removeActiveProject } = useFocus()
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
          onClick={() => removeActiveProject({ periodId, projectId: id })}
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
  const { updateActivePeriodFocus, createPeriod, updatePeriod } = useFocus()

  const completeActiveFocus = () => {
    updatePeriod({ id, isActive: false })
    createPeriod()
  }

  return (
    <div>
      <div className="flex justify-center text-lg font-bold text-foreground/50 mb-12">
        <FocusPeriodDatePicker periodId={id} />
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
            onLayout={values => updateActivePeriodFocus({ periodId: id, values })}
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
