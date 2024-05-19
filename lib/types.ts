import { isFuture, isPast } from 'date-fns'

export type Project = {
  id: string
  name: string
  isArchived?: boolean
  isDeleted?: boolean
  color: string
}

export type ActiveFocusPeriod = {
  id: string
  periodStart: string
  periodEnd?: string
  projects: {
    projectId: string
    focus: number // 0-100
  }[]
}
export type PastFocusPeriod = Required<ActiveFocusPeriod>
export type FocusPeriod = ActiveFocusPeriod | PastFocusPeriod

export const isActiveFocusPeriod = (period: FocusPeriod): period is ActiveFocusPeriod => {
  return period.periodEnd === undefined || isFuture(new Date(period.periodEnd))
}

export const isPastFocusPeriod = (period: FocusPeriod): period is PastFocusPeriod => {
  return period.periodEnd !== undefined && isPast(new Date(period.periodEnd))
}

export type FocusPeriodFullProject = Project & {
  focus: number // 0-100
}

export type FocusPeriodWithProjects = Omit<FocusPeriod, 'projects'> & {
  projects: FocusPeriodFullProject[]
}
