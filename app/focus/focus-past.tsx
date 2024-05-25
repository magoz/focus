import {
  Period as PeriodType,
  PeriodWithProjects,
  Project as ProjectType,
  isInactivePeriod
} from '@/lib/types'
import { formatDateRange } from '@/lib/utils'
import { FocusPeriodActions } from './period-actions'
import { useFocus } from '@/lib/use-focus'

const Project = ({
  focus,
  color,
  name
}: Pick<ProjectType & PeriodType['projects'][0], 'focus' | 'color' | 'name'>) => {
  return (
    <div
      className="relative flex gap-1 h-6 px-6 first:rounded-tl-full first:rounded-bl-full last:rounded-tr-full last:rounded-br-full items-center justify-center text-xs font-bold text-foreground truncate select-none pointer-events-none"
      style={{ width: `${focus}%`, backgroundColor: color }}
    >
      <span className="truncate">{name}</span>
      <span className="opacity-50">{focus.toFixed(0)}</span>
    </div>
  )
}

const Period = ({ period }: { period: PeriodWithProjects }) => {
  const { projects } = useFocus()
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm font-bold text-foreground/30">
        {formatDateRange(period.start, period.end)}

        <FocusPeriodActions focusPeriodWithProjects={period} />
      </div>

      <div className="flex w-full">
        {period &&
          period.projects.map(p => {
            const project = getProject(p.id, projects)
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
  const { periods, getPeriodWithProjects } = useFocus()
  const pastFocus = periods
    .filter(isInactivePeriod)
    .toSorted((a, b) => b.start.localeCompare(a.end))

  return (
    <section className="">
      <h3 className="text-3xl font-bold mb-6 text-center select-none">Past Focus</h3>

      <div className="flex flex-col gap-8 w-full">
        {pastFocus.map(period => {
          const periodWithFullProjects = getPeriodWithProjects(period)
          return <Period key={period.id} period={periodWithFullProjects} />
        })}
      </div>
    </section>
  )
}
