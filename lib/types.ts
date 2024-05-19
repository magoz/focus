export type Project = {
  id: string
  name: string
  isArchived?: boolean
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
