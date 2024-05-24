import { z } from 'zod'

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  isArchived: z.boolean(),
  isDeleted: z.boolean(),
  color: z.string()
})
export type Project = z.infer<typeof ProjectSchema>

const PeriodSchema = z.object({
  id: z.string(),
  start: z.string(),
  end: z.string(),
  isActive: z.boolean(),
  projects: z
    .object({
      id: z.string(),
      focus: z.number()
    })
    .array()
})
export type Period = z.infer<typeof PeriodSchema>

const ActivePeriodSchema = PeriodSchema.omit({ isActive: true }).extend({
  isActive: z.literal(true)
})
export type ActivePeriod = z.infer<typeof ActivePeriodSchema>

const InactivePeriodSchema = PeriodSchema.omit({ isActive: true }).extend({
  isActive: z.literal(false)
})
export type InactivePeriod = z.infer<typeof InactivePeriodSchema>

export const isActivePeriod = (period: Period): period is ActivePeriod => {
  return period.isActive === true
}

export const isInactivePeriod = (period: Period): period is InactivePeriod => {
  return !period.isActive
}

const BgImageSchema = z.union([
  z.literal('sky'),
  z.literal('space'),
  z.literal('train'),
  z.literal('flowers')
])
export const bgImageOptions = BgImageSchema.options.map(option => option._def.value)
export type BgImage = z.infer<typeof BgImageSchema>

const SettingsSchema = z.object({
  colors: z.array(z.string()),
  bgImage: BgImageSchema
})
export type Settings = z.infer<typeof SettingsSchema>

export const FocusAppSchema = z.object({
  projects: ProjectSchema.array(),
  periods: PeriodSchema.array(),
  settings: SettingsSchema
})

export type FocusApp = z.infer<typeof FocusAppSchema>

/////////////////////////////////////
/////////////////////////////////////

export type ProjectWithFocus = Project & {
  focus: number // 0-100
}

export type PeriodWithProjects = Omit<Period, 'projects'> & {
  projects: ProjectWithFocus[]
}
