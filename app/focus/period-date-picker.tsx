import * as React from 'react'
import { isSameDay } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn, formatDay } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type Props = React.HTMLAttributes<HTMLDivElement> &
  DateRange & {
    updateDates: (Date: DateRange | undefined) => void
  }

export const FocusPeriodDatePicker = ({ from, to, updateDates, className }: Props) => {
  const noDate = !from && !to

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'h-auto justify-start text-left bg-transparent hover:bg-transparent border-none p-0 font-bold text-foreground/40 text-lg',
              noDate && 'text-muted-foreground'
            )}
          >
            {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
            {from && to ? (
              <>
                {formatDay(from)}
                {!isSameDay(from, to) && ` - ${formatDay(to)}`}
              </>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={from}
            selected={{ from, to }}
            onSelect={updateDates}
            weekStartsOn={1}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
