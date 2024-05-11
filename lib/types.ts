type Project = {
  id: string
  name: string
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
  focus: number // 0-100
  color: string
}
