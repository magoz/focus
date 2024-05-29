'use client'

import { useAtom } from 'jotai'
import { focusAtom } from './local-state'
import { useCallback } from 'react'
import { ProjectWithFocus, PeriodWithProjects, Period, Project, bgImageOptions } from './types'
import { getCurrentUTCTimestamp, pickRandom, pickRandomColor, toDayString } from './utils'
import { createId } from '@paralleldrive/cuid2'
import { getNextFocusPeriod } from '@/app/periods/utils'

export const useFocus = () => {
  const [appData, setAppData] = useAtom(focusAtom)
  const { projects, periods, settings } = appData

  ////////////////////////////////////
  // PROJECTS
  ////////////////////////////////////

  const createProject = useCallback(async () => {
    setAppData(prev => {
      return {
        ...prev,
        lastEdit: getCurrentUTCTimestamp(),
        projects: [
          ...prev.projects,
          {
            id: createId(),
            name: 'New Project',
            color: pickRandomColor(),
            isArchived: false,
            isDeleted: false
          }
        ]
      }
    })
  }, [setAppData])

  const updateProject = useCallback(
    ({ id, ...updatedData }: Partial<Project> & { id: Project['id'] }) => {
      setAppData(prev => {
        return {
          ...prev,
          lastEdit: getCurrentUTCTimestamp(),
          projects: prev.projects.map(p =>
            p.id === id
              ? {
                  ...p,
                  ...updatedData
                }
              : p
          )
        }
      })
    },
    [setAppData]
  )

  ////////////////////////////////////
  // PERIODS
  ////////////////////////////////////

  const getPeriod = useCallback(
    (id: string) => {
      return periods.find(p => p.id === id)
    },
    [periods]
  )

  const getPeriodWithProjects = useCallback(
    (period: Period): PeriodWithProjects => {
      const activeProjects = period.projects.map(project => {
        const existingProject = projects.find(p => p.id === project.id)
        if (!existingProject) throw new Error(`Project with id ${project.id} not found`)
        return {
          ...existingProject,
          focus: project.focus
        } satisfies ProjectWithFocus
      })

      return {
        ...period,
        projects: activeProjects
      }
    },
    [projects]
  )

  const createPeriod = useCallback(() => {
    setAppData(prev => {
      const { start: nextStart, end: nextEnd } = getNextFocusPeriod(periods)
      return {
        ...prev,
        lastEdit: getCurrentUTCTimestamp(),
        periods: [
          ...prev.periods,
          {
            id: createId(),
            isActive: true,
            start: toDayString(nextStart),
            end: toDayString(nextEnd),
            projects: []
          }
        ]
      }
    })
  }, [setAppData, periods])

  const updatePeriod = useCallback(
    ({ id, ...updatedData }: Partial<Period> & { id: Period['id'] }) => {
      setAppData(prev => {
        return {
          ...prev,
          lastEdit: getCurrentUTCTimestamp(),
          periods: prev.periods.map(period => {
            if (period.id !== id) return period
            return {
              ...period,
              ...updatedData
            }
          })
        }
      })
    },
    [setAppData]
  )

  const focusPeriod = useCallback(
    (id: string) => {
      setAppData(prev => {
        return {
          ...prev,
          lastEdit: getCurrentUTCTimestamp(),
          periods: prev.periods.flatMap(period => {
            if (period.id !== id) {
              if (period.projects.length === 0) return [] // we don't want to keep empty periods

              return { ...period, isActive: false }
            }
            return {
              ...period,
              isActive: true
            }
          })
        }
      })
    },
    [setAppData]
  )

  const updateActivePeriodFocus = useCallback(
    ({ periodId, values }: { periodId: string; values: number[] }) => {
      setAppData(prev => {
        return {
          ...prev,
          lastEdit: getCurrentUTCTimestamp(),
          periods: prev.periods.map(period => {
            if (period.id !== periodId) return period
            return {
              ...period,
              projects: period.projects.map((project, i) => {
                return {
                  ...project,
                  focus: values[i]
                }
              })
            }
          })
        }
      })
    },
    [setAppData]
  )

  const addProjectToPeriod = useCallback(
    ({ projectId, periodId }: { projectId: string; periodId: string }) => {
      setAppData(prev => {
        return {
          ...prev,
          lastEdit: getCurrentUTCTimestamp(),
          periods: prev.periods.map(period => {
            if (period.id !== periodId) return period // Not the current period
            if (period.projects.find(project => project.id === projectId)) return period // already added
            return {
              ...period,
              projects: [
                ...period.projects,
                {
                  id: projectId,
                  focus: 50
                }
              ]
            }
          })
        }
      })
    },
    [setAppData]
  )

  const removeProjectFromPeriod = useCallback(
    ({ projectId, periodId }: { projectId: string; periodId: string }) => {
      setAppData(prev => {
        return {
          ...prev,
          lastEdit: getCurrentUTCTimestamp(),
          periods: prev.periods.map(period => {
            if (period.id !== periodId) return period
            return {
              ...period,
              projects: period.projects.filter(p => p.id !== projectId)
            }
          })
        }
      })
    },
    [setAppData]
  )

  const deletePeriod = useCallback(
    (id: string) => {
      setAppData(prev => {
        return {
          ...prev,
          lastEdit: getCurrentUTCTimestamp(),
          periods: prev.periods.filter(p => p.id !== id)
        }
      })
    },
    [setAppData]
  )

  // GETTERS

  const updateBackgroundImage = useCallback(() => {
    setAppData(prev => {
      return {
        ...prev,
        lastEdit: getCurrentUTCTimestamp(),
        settings: {
          ...prev.settings,
          bgImage: pickRandom(bgImageOptions.filter(option => option !== prev.settings.bgImage))
        }
      }
    })
  }, [setAppData])

  return {
    appData,
    setAppData,
    projects,
    periods,
    settings,
    createProject,
    updateProject,
    getPeriod,
    getPeriodWithProjects,
    createPeriod,
    updatePeriod,
    focusPeriod,
    updateActivePeriodFocus,
    addProjectToPeriod,
    removeProjectFromPeriod,
    deletePeriod,
    updateBackgroundImage
  }
}
