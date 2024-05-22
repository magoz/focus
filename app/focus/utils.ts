import { FocusPeriod } from '@/lib/types'
import { addDays, differenceInDays, isPast } from 'date-fns'

const DEFAULT_FOCUS_DURATION = 7

export const getNextFocusPeriod = (periods: FocusPeriod[]) => {
  const lastFocus = periods.toSorted((a, b) => b.periodStart.localeCompare(a.periodStart)).at(0)
  if (!lastFocus) {
    return {
      periodStart: new Date(),
      periodEnd: addDays(new Date(), DEFAULT_FOCUS_DURATION)
    }
  }

  const duration = differenceInDays(lastFocus.periodEnd, lastFocus.periodStart)

  // TODO: extract day of the week start period

  const nextPeriodStart = isPast(addDays(lastFocus.periodEnd, 1))
    ? new Date()
    : addDays(lastFocus.periodEnd, 1)

  return {
    periodStart: nextPeriodStart,
    periodEnd: addDays(nextPeriodStart, duration)
  }
}
