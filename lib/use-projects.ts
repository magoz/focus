import { useCallback, useState } from 'react'
import { defaultProjects, defaultFocusPeriods } from './defaults'
import { Project, FocusPeriod } from './types'
import { useAtom } from 'jotai'
import { projectsAtom } from './local-state'

export const useEditProject = () => {
  const [, setProjects] = useAtom(projectsAtom)
  const editProject = useCallback(
    (updatedProject: Project) => {
      setProjects(projects =>
        projects.map(project => (project.id === updatedProject.id ? updatedProject : project))
      )
    },
    [setProjects]
  )

  return { editProject }
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [focusPeriods, setFocusPeriods] = useState<FocusPeriod[]>(defaultFocusPeriods)

  const activeProjects = projects.filter(project => !project.isArchived)
  const archivedProjects = projects.filter(project => project.isArchived)

  const currentPeriod = focusPeriods.at(-1)
  const currentFocusProjects = currentPeriod
    ? currentPeriod.projects.map(activeProject => {
        const project = projects.find(p => p.id === activeProject.projectId)
        if (!project) throw new Error(`Project with id ${activeProject.projectId} not found`)
        return {
          ...project,
          focus: activeProject.focus
        }
      })
    : []

  return {
    projects,
    activeProjects,
    archivedProjects,
    currentPeriod,
    currentFocusProjects
  }
}
