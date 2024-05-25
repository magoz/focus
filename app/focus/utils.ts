import { Period } from '@/lib/types'
import { addDays, differenceInDays, isPast } from 'date-fns'

const DEFAULT_FOCUS_DURATION = 7

export const getNextFocusPeriod = (periods: Period[]) => {
  const lastFocus = periods.toSorted((a, b) => b.start.localeCompare(a.end)).at(0)
  if (!lastFocus) {
    return {
      start: new Date(),
      end: addDays(new Date(), DEFAULT_FOCUS_DURATION)
    }
  }

  const duration = differenceInDays(lastFocus.start, lastFocus.end)

  const nextPeriodStart = isPast(addDays(lastFocus.end, 1)) ? new Date() : addDays(lastFocus.end, 1)

  return {
    start: nextPeriodStart,
    end: addDays(nextPeriodStart, duration)
  }
}
