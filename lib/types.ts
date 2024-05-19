export type Project = {
  id: string
  name: string
  isArchived?: boolean
  isDeleted?: boolean
  color: string
}

export type FocusPeriod = {
  periodStart: string
  periodEnd?: string
  projects: {
    projectId: string
    focus: number // 0-100
  }[]
}

export type FocusPeriodFullProject = Project & {
  focus: number // 0-100
}

export type FocusPeriodWithProjects = Omit<FocusPeriod, 'projects'> & {
  projects: FocusPeriodFullProject[]
}
