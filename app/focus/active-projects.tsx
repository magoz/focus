'use client'

import { FocusActive } from './focus-active'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFocus } from '@/lib/use-focus'
import { isActivePeriod } from '@/lib/types'

export const ActiveProjects = () => {
  const { periods, getFocusPeriodFullProjects } = useFocus()
  const activePeriods = periods.filter(isActivePeriod)

  return (
    <section className="mt-[20vh] mb-[15vh] flex flex-col justify-center">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-5xl font-bold leading-none">Focus</h2>
        {activePeriods.length > 0 ? (
          <>
            {activePeriods.map(period => {
              const activeFocusWithProjects = getFocusPeriodFullProjects(period)
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
