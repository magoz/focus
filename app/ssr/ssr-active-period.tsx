'use client'

import { Button } from '@/components/ui/button'
import { ProjectWithFocus, PeriodWithProjects } from '@/lib/types'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import { FocusPeriodDatePicker } from '../periods/period-date-picker'
import { useDebounce } from '@uidotdev/usehooks'
import { useCallback, useEffect, useState } from 'react'

const Project = ({
  project,
  isLast
}: {
  project: ProjectWithFocus
  isLast: boolean
  periodId: string
}) => {
  const { id, name, focus, color } = project

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
          variant="icon"
          className="flex gap-2 select-none text-foreground font-bold truncate"
        >
          <>
            <span className="truncate">{name}</span>
            <span className="opacity-50">{focus.toFixed(0)}</span>
          </>
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

export const SSRActivePeriod = ({ focusPeriodProjects }: Props) => {
  const { id, projects } = focusPeriodProjects
  const [values, setValues] = useState<number[]>(focusPeriodProjects.projects.map(p => p.focus))
  const debouncedSearchTerm = useDebounce(values, 300)
  console.log('focusPeriodProjects', focusPeriodProjects)
  console.log('debouncedSearchTerm ', debouncedSearchTerm)

  useEffect(() => {
    console.log('debouncedSearchTerm useEffect', debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const updateActivePeriodFocus = ({
    periodId,
    values
  }: {
    periodId: string
    values: number[]
  }) => {
    setValues(values)
  }

  return (
    <div>
      <div className="flex justify-center text-lg font-bold text-foreground/50 mb-12">
        <FocusPeriodDatePicker periodId={id} />
      </div>
      <div className="flex w-full gap-4">
        {projects.length > 0 ? (
          <PanelGroup
            direction="horizontal"
            onLayout={values => updateActivePeriodFocus({ periodId: id, values })}
            // autoSaveId="active-panels"
            // storage={panelGroupStorage}
          >
            {projects.map((project, index, arr) => {
              const isLast = index === arr.length - 1
              const projectWithUpdatedFocus = { ...project, focus: values[index] }
              return (
                <Project
                  key={project.id}
                  project={projectWithUpdatedFocus}
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
    </div>
  )
}
