'use client'

import { focusPeriodsAtom, projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { FocusActive } from './focus-active'
import { getFocusPeriodFullProjects } from '@/lib/use-projects'
import { createId } from '@paralleldrive/cuid2'
import { isActiveFocusPeriod } from '@/lib/types'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
        <h2 className="text-center text-4xl font-bold mb-8">Focus</h2>
        {activePeriods.length > 0 ? (
          <>
            {activePeriods.map(period => {
              const activeFocusWithProjects = getFocusPeriodFullProjects(projects, period)
              return <FocusActive key={period.id} focusPeriodProjects={activeFocusWithProjects} />
            })}
          </>
        ) : (
          <div className="flex justify-center w-full h-12 border-2 rounded-full">
            <Button variant="icon">
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
