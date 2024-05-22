import { type ClassValue, clsx } from 'clsx'
import { format, startOfDay } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDay = (date: string | Date, { year }: { year?: boolean } = {}) => {
  return format(startOfDay(new Date(date)), year ? 'MMM d, yyyy' : 'MMM d')
}

export const toDayString = (date: string | Date) => {
  const dateWithoutTime = startOfDay(new Date(date))
  const string = format(dateWithoutTime, 'yyyy-MM-dd')
  return string
}
