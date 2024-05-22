'use client'

import { focusPeriodsAtom, projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { FocusActive } from './focus-active'
import { getFocusPeriodFullProjects } from '@/lib/use-projects'
import { createId } from '@paralleldrive/cuid2'
import { isActiveFocusPeriod } from '@/lib/types'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { add } from 'date-fns'
import { toDayString } from '@/lib/utils'

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
          periodStart: toDayString(new Date()),
          periodEnd: toDayString(add(new Date(), { days: 7 })),
          projects: []
        }
      ]
    })
  }

  return (
    <section className="mt-[20vh] mb-[15vh] flex flex-col justify-center">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-5xl font-bold leading-none">Focus</h2>
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
