import { focusPeriodsAtom, projectsAtom } from '@/lib/local-state'
import { FocusPeriod as FocusPeriodType, Project as ProjectType } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { isPast } from 'date-fns'
import { useAtom } from 'jotai'

const Project = ({
  focus,
  color,
  name
}: Pick<ProjectType & FocusPeriodType['projects'][0], 'focus' | 'color' | 'name'>) => {
  return (
    <div
      className="relative flex h-8 rounded-[10px] items-center justify-center"
      style={{ width: `${focus}%`, backgroundColor: color }}
    >
      <span className="text-xs font-bold text-foreground select-none pointer-events-none">
        {name}
      </span>
    </div>
  )
}

const FocusPeriod = ({ period }: { period: FocusPeriodType }) => {
  const [projects] = useAtom(projectsAtom)
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm font-bold text-slate-500">
        {formatDate(period.periodStart)} - {period.periodEnd && formatDate(period.periodEnd)}
      </div>

      <div className="flex w-full gap-1.5">
        {period &&
          period.projects.map(p => {
            const project = getProject(p.projectId, projects)
            return (
              <Project key={project.id} focus={p.focus} color={project.color} name={project.name} />
            )
          })}
      </div>
    </div>
  )
}

const getProject = (id: string, projects: ProjectType[]) => {
  const project = projects.find(p => p.id === id)
  if (!project) throw new Error(`Project with id ${id} not found`)
  return project
}

export const PastFocus = () => {
  const [focusPeriods] = useAtom(focusPeriodsAtom)
  const pastFocus = focusPeriods
    .filter(period => period.periodEnd && isPast(new Date(period.periodEnd)))
    .toSorted((a, b) => b.periodStart.localeCompare(a.periodStart))

  return (
    <section className="">
      <h3 className="text-4xl font-bold mb-6 select-none">Past Focus</h3>

      <div className="flex flex-col gap-4 w-full">
        {pastFocus.map((period, index) => {
          return <FocusPeriod key={index} period={period} />
        })}
      </div>
    </section>
  )
}
