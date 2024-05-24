import { useAtom } from 'jotai'
import { focusAtom } from './local-state'
import { useCallback } from 'react'
import { ProjectWithFocus, PeriodWithProjects, Period, Project, bgImageOptions } from './types'
import { DateRange } from 'react-day-picker'
import { pickRandom, pickRandomColor, toDayString } from './utils'
import { createId } from '@paralleldrive/cuid2'
import { getNextFocusPeriod } from '@/app/focus/utils'

export const useFocus = () => {
  const [{ projects, periods, settings }, setFocus] = useAtom(focusAtom)

  ////////////////////////////////////
  // PROJECTS
  ////////////////////////////////////

  const createProject = useCallback(() => {
    setFocus(prev => {
      return {
        ...prev,
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
  }, [setFocus])

  const updateProject = useCallback(
    ({ id, ...updatedData }: Partial<Project> & { id: Project['id'] }) => {
      setFocus(prev => {
        return {
          ...prev,
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
    [setFocus]
  )

  ////////////////////////////////////
  // PERIODS
  ////////////////////////////////////

  const createPeriod = useCallback(() => {
    setFocus(prev => {
      const { periodStart: nextPeriodStart, periodEnd: nextPeriodEnd } = getNextFocusPeriod(periods)
      return {
        ...prev,
        periods: [
          ...prev.periods,
          {
            id: createId(),
            isActive: true,
            start: toDayString(nextPeriodStart),
            end: toDayString(nextPeriodEnd),
            projects: []
          }
        ]
      }
    })
  }, [setFocus, periods])

  const updatePeriod = useCallback(
    ({ id, ...newPeriodData }: Partial<Period> & { id: Period['id'] }) => {
      setFocus(prev => {
        return {
          ...prev,
          periods: prev.periods.map(period => {
            if (period.id !== id) return period
            return {
              ...period,
              newPeriodData
            }
          })
        }
      })
    },
    [setFocus]
  )

  const updateActivePeriodFocus = useCallback(
    ({ periodId, values }: { periodId: string; values: number[] }) => {
      setFocus(prev => {
        return {
          ...prev,
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
    [setFocus]
  )

  const updatePeriodDates = useCallback(
    ({ periodId, dates }: { periodId: string; dates: DateRange | undefined }) => {
      setFocus(prev => {
        return {
          ...prev,
          periods: prev.periods.map(period => {
            if (period.id !== periodId) return period
            const periodStart = dates?.from ? toDayString(dates.from) : toDayString(new Date())
            return {
              ...period,
              periodStart,
              periodEnd: dates?.to ? toDayString(dates.to) : periodStart
            }
          })
        }
      })
    },
    [setFocus]
  )

  const addProjectToPeriod = useCallback(
    ({ projectId, periodId }: { projectId: string; periodId: string }) => {
      setFocus(prev => {
        return {
          ...prev,
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
    [setFocus]
  )

  const removeProjectFromPeriod = useCallback(
    ({ projectId, periodId }: { projectId: string; periodId: string }) => {
      setFocus(prev => {
        return {
          ...prev,
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
    [setFocus]
  )

  const deletePeriod = useCallback(
    (id: string) => {
      setFocus(prev => {
        return {
          ...prev,
          periods: prev.periods.filter(p => p.id !== id)
        }
      })
    },
    [setFocus]
  )

  const getFocusPeriodFullProjects = useCallback(
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

  // GETTERS

  const updateBackgroundImage = useCallback(() => {
    setFocus(prev => {
      return {
        ...prev,
        settings: {
          ...prev.settings,
          bgImage: pickRandom(bgImageOptions.filter(option => option !== prev.settings.bgImage))
        }
      }
    })
  }, [setFocus])

  return {
    projects,
    periods,
    settings,
    getFocusPeriodFullProjects,
    createProject,
    updateProject,
    createPeriod,
    updatePeriod,
    updateActivePeriodFocus,
    updatePeriodDates,
    addProjectToPeriod,
    removeProjectFromPeriod,
    deletePeriod,
    updateBackgroundImage
  }
}
