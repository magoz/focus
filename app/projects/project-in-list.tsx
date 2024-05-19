import { useState } from 'react'
import { useAtom } from 'jotai'
import { projectsAtom, focusPeriodsAtom } from '@/lib/local-state'
import { Edit3Icon, TargetIcon, ArchiveIcon, ArchiveRestoreIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Project } from '@/lib/types'
import { EditProject } from './edit'

type Props = {
  project: Project
}

export const ProjectInList = ({ project }: Props) => {
  const [, setProjects] = useAtom(projectsAtom)
  const [, setFocusPeriods] = useAtom(focusPeriodsAtom)
  const [editing, setEditing] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const { id, color, name } = project

  const toggleEdit = () => setEditing(prev => !prev)
  const toggleShowDeleteConfirmation = () => setShowDeleteConfirmation(prev => !prev)

  const addProjectToFocusPeriod = () => {
    setFocusPeriods(prev => {
      return prev.map((period, index) => {
        if (index !== prev.length - 1) return period // Not the current period
        if (period.projects.find(project => project.projectId === id)) return period // already added
        return {
          ...period,
          projects: [
            ...period.projects,
            {
              projectId: id,
              focus: 50
            }
          ]
        }
      })
    })
  }

  const toggleArchiveProject = () => {
    setProjects(prev => {
      return prev.map(project => {
        return project.id === id ? { ...project, isArchived: !project.isArchived } : project
      })
    })
  }

  const deleteProject = () => {
    setProjects(prev => {
      return prev.map(project => {
        return project.id === id ? { ...project, isDeleted: true } : project
      })
    })
  }

  return (
    <div>
      <div
        key={id}
        className="relative flex w-full h-16 rounded-xl items-center justify-center cursor-pointer"
        style={{ backgroundColor: color }}
      >
        <span className="font-bold select-none pointer-events-none">{name}</span>
        <div className="absolute top-1 right-2 flex gap-2">
          <Button variant="link" onClick={toggleEdit} className="p-0">
            <Edit3Icon className="w-4 h-4" />
          </Button>

          {!project.isArchived && (
            <Button variant="link" onClick={addProjectToFocusPeriod} className="p-0">
              <TargetIcon className="w-4 h-4" />
            </Button>
          )}

          <Button variant="link" onClick={toggleArchiveProject} className="p-0">
            {project.isArchived ? (
              <ArchiveRestoreIcon className="w-4 h-4" />
            ) : (
              <ArchiveIcon className="w-4 h-4" />
            )}
          </Button>

          <Button variant="link" onClick={toggleShowDeleteConfirmation} className="p-0">
            <Trash2Icon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {editing && <EditProject project={project} />}

      {showDeleteConfirmation && (
        <>
          <div className="text-center mt-2 mb-2">You sure?</div>
          <div className="flex gap-2 mb-2">
            <Button variant="outline" onClick={toggleShowDeleteConfirmation} className="w-1/2">
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteProject} className="w-1/2">
              Delete Project
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
