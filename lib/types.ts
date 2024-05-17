type Project = {
  id: string
  name: string
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' // TODO: remove
  focus: number // 0-100 // TODO: remove
  isArchived?: boolean
  color: string
}

type FocusPeriod = {
  periodStart: string
  periodEnd?: string
  projects: {
    projectId: string
    focus: number // 0-100
  }[]
}
