'use client'

import { focusPeriodsAtom, projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { FocusActive } from './focus-active'
import { getFocusPeriodFullProjects } from '@/lib/use-projects'
import { createId } from '@paralleldrive/cuid2'
import { isActiveFocusPeriod } from '@/lib/types'

export const ActiveProjects = () => {
  const [projects] = useAtom(projectsAtom)
  const [focusPeriods, setFocusPeriods] = useAtom(focusPeriodsAtom)

  const activePeriods = focusPeriods.filter(isActiveFocusPeriod)

  const addFocusPeriod = () => {
    setFocusPeriods(prev => {
      return [
        ...prev,
        {
          id: createId(),
          periodStart: new Date().toISOString(),
          projects: []
        }
      ]
    })
  }

  return (
    <section>
      <div className="flex flex-col gap-4">
        {activePeriods.map(period => {
          const activeFocusWithProjects = getFocusPeriodFullProjects(projects, period)
          return <FocusActive key={period.id} focusPeriodProjects={activeFocusWithProjects} />
        })}
      </div>
    </section>
  )
}
