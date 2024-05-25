import * as React from 'react'
import { SelectRangeEventHandler } from 'react-day-picker'

import { cn, formatDateRange, toDayString } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useFocus } from '@/lib/use-focus'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  periodId: string
}

export const FocusPeriodDatePicker = ({ periodId, className }: Props) => {
  const { getPeriod, updatePeriod } = useFocus()
  const period = getPeriod(periodId)
  if (!period) return null

  const { id, start, end } = period

  // Reset the range if the user clicks on the same day using selectedDay
  // https://github.com/gpbl/react-day-picker/issues/2140#issuecomment-2127651564
  // This will be addressed in future versions
  // TODO: check the new version and adapt behavior if needed
  const handleSelect: SelectRangeEventHandler = (nextRange, selectedDay) => {
    updatePeriod({
      id,
      start: nextRange?.from ? toDayString(nextRange.from) : toDayString(selectedDay),
      end: nextRange?.to ? toDayString(nextRange.to) : toDayString(selectedDay)
    })
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'h-auto justify-start text-left bg-transparent hover:bg-transparent border-none p-0 font-bold text-foreground/40 text-lg'
            )}
          >
            {formatDateRange(start, end)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center" side="bottom" avoidCollisions={false}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={new Date(start)}
            selected={{ from: new Date(start), to: new Date(end) }}
            onSelect={handleSelect}
            weekStartsOn={1}
            numberOfMonths={1}
            fixedWeeks={true}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
