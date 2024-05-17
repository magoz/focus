import { focusPeriodsAtom, projectsAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'

const Project = ({
  focus,
  color,
  name
}: Pick<Project & FocusPeriod['projects'][0], 'focus' | 'color' | 'name'>) => {
  return (
    <div
      className="relative flex h-8 rounded-md items-center justify-center"
      style={{ width: `${focus}%`, backgroundColor: color }}
    >
      <span className="text-xs font-bold text-white/50 select-none pointer-events-none">
        {name}
      </span>
    </div>
  )
}

const FocusPeriod = ({ period }: { period: FocusPeriod }) => {
  const [projects] = useAtom(projectsAtom)
  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full gap-1">
        {period &&
          period.projects.map(p => {
            const project = getProject(p.projectId, projects)
            return (
              <Project key={project.id} focus={p.focus} color={project.color} name={project.name} />
            )
          })}
      </div>

      <div className="text-sm font-bold">
        {period?.periodStart} {period?.periodEnd}
      </div>
    </div>
  )
}

const getProject = (id: string, projects: Project[]) => {
  const project = projects.find(p => p.id === id)
  if (!project) throw new Error(`Project with id ${id} not found`)
  return project
}

export const PastFocus = () => {
  const [focusPeriods] = useAtom(focusPeriodsAtom)
  const pastFocus = focusPeriods.slice(0, -1)

  return (
    <section className="flex flex-col gap-4 w-full">
      <h3 className="text-2xl font-bold">Past Focus</h3>
      {pastFocus.map((period, index) => {
        return <FocusPeriod key={index} period={period} />
      })}
    </section>
  )
}
