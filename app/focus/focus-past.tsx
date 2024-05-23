import { focusPeriodsAtom, projectsAtom } from '@/lib/local-state'
import {
  FocusPeriod as FocusPeriodType,
  FocusPeriodWithProjects,
  Project as ProjectType,
  isPastFocusPeriod
} from '@/lib/types'
import { formatDay, toDayString } from '@/lib/utils'
import { useAtom } from 'jotai'
import { FocusPeriodActions } from './period-actions'
import { getFocusPeriodFullProjects } from '@/lib/use-projects'

const Project = ({
  focus,
  color,
  name
}: Pick<ProjectType & FocusPeriodType['projects'][0], 'focus' | 'color' | 'name'>) => {
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

const FocusPeriod = ({ period }: { period: FocusPeriodWithProjects }) => {
  const [projects] = useAtom(projectsAtom)
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm font-bold text-foreground/30">
        {`${formatDay(period.periodStart, { year: true })} - ${formatDay(period.periodEnd, { year: true })}`}
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
  const [focusPeriods] = useAtom(focusPeriodsAtom)
  const [projects] = useAtom(projectsAtom)
  const pastFocus = focusPeriods
    .filter(isPastFocusPeriod)
    .toSorted((a, b) => b.periodStart.localeCompare(a.periodStart))

  return (
    <section className="">
      <h3 className="text-3xl font-bold mb-6 text-center select-none">Past Focus</h3>

      <div className="flex flex-col gap-8 w-full">
        {pastFocus.map(period => {
          const periodWithFullProjects = getFocusPeriodFullProjects(projects, period)
          return <FocusPeriod key={period.id} period={periodWithFullProjects} />
        })}
      </div>
    </section>
  )
}
