'use client'

import { focusPeriodsAtom, projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { FocusActive } from './focus-active'
import { getFocusPeriodFullProjects } from '@/lib/use-projects'
import { isFuture } from 'date-fns'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export const ActiveProjects = () => {
  const [projects] = useAtom(projectsAtom)
  const [focusPeriods, setFocusPeriods] = useAtom(focusPeriodsAtom)

  const activePeriods = focusPeriods.filter(
    period => !period.periodEnd || isFuture(new Date(period.periodEnd))
  )

  const addFocusPeriod = () => {
    setFocusPeriods(prev => {
      return [
        ...prev,
        {
          periodStart: new Date().toISOString(),
          projects: []
        }
      ]
    })
  }

  return (
    <section>
      <div className="flex gap-4 items-center text-4xl font-bold mb-4 select-none">
        <h3>Active</h3>
        <Button variant="link" onClick={addFocusPeriod} className="p-0">
          <PlusIcon className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {activePeriods.map((period, index) => {
          const activeFocusWithProjects = getFocusPeriodFullProjects(projects, period)
          return <FocusActive key={index} focusPeriodProjects={activeFocusWithProjects} />
        })}
      </div>
    </section>
  )
}
