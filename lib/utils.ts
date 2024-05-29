import { type ClassValue, clsx } from 'clsx'
import { format, formatISO, isSameDay, isThisYear, startOfDay } from 'date-fns'
import { UTCDate } from '@date-fns/utc'
import { twMerge } from 'tailwind-merge'
import { colors } from './defaults'
import { bgImageOptions } from './types'

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

export const formatDateRange = (from: string | Date, to: string | Date) => {
  const formattedFrom = formatDay(from, { year: !isThisYear(from) })
  const formattedTo = !isSameDay(from, to) ? ` - ${formatDay(to, { year: !isThisYear(to) })}` : ''
  return `${formattedFrom}${formattedTo}`
}

export const pickRandom = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length)
  const randomItem = array[randomIndex]
  if (!randomItem) throw new Error('Array is empty')
  return randomItem
}

export const pickRandomColor = () => pickRandom(colors)
export const pickRandomBackgroundImage = () => pickRandom(bgImageOptions)

export const getCurrentUTCTimestamp = () => formatISO(new UTCDate())
