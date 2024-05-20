import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type Props = React.HTMLAttributes<HTMLDivElement> &
  DateRange & {
    updateDates: (Date: DateRange | undefined) => void
  }

export const FocusPeriodDatePicker = ({ from, to, updateDates, className }: Props) => {
  console.log('from', from)
  console.log('to', to)

  const noDate = !from && !to

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'h-auto justify-start text-left border-none p-0 font-bold text-lg',
              noDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {from ? (
              to ? (
                <>
                  {formatDate(from)} - {formatDate(to)}
                </>
              ) : (
                format(from, 'LLL dd, y')
              )
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
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
