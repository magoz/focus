import { atomWithStorage } from 'jotai/utils'
import { defaultFocusPeriods, defaultProjects } from './defaults'
import { FocusPeriod, Project } from './types'

export const projectsAtom = atomWithStorage<Project[]>('projects', defaultProjects, undefined, {
  getOnInit: true
})

export const focusPeriodsAtom = atomWithStorage<FocusPeriod[]>(
  'focus-periods',
  defaultFocusPeriods,
  undefined,
  { getOnInit: true }
)
