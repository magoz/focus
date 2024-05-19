import { useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { projectsAtom, focusPeriodsAtom } from '@/lib/local-state'
import { Edit3Icon, ArchiveIcon, ArchiveRestoreIcon, Trash2Icon, EllipsisIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Project } from '@/lib/types'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import ColorPicker, { themes } from 'react-pick-color'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverAnchor } from '@radix-ui/react-popover'
import { colors } from '@/lib/defaults'

type Props = {
  project: Project
}

export const ProjectInList = ({ project }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [, setProjects] = useAtom(projectsAtom)
  const [, setFocusPeriods] = useAtom(focusPeriodsAtom)
  const [isRenaming, setIsRenaming] = useState(false)
  const [isRecoloring, setIsRecoloring] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const { id, color, name, isArchived } = project

  const toggleIsRenaming = (value?: boolean) => {
    setShowMenu(false)
    setIsRenaming(prev => (value !== undefined ? value : !prev))
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }, 150) // wait for the dropdownmenu to handle focus. Not ideal. Should be a better way
  }

  const openRecoloring = () => {
    setShowMenu(false)
    setTimeout(() => {
      setIsRecoloring(true)
    }, 200) // wait for the dropdownmenu to handle focus. Not ideal. Should be a better way
  }

  // useEffect(() => {
  //   if (isRenaming) inputRef.current?.focus()
  // }, [isRenaming])

  const toggleShowDeleteConfirmation = () => setShowDeleteConfirmation(prev => !prev)

  const rename = (value: string) => {
    setProjects(prev => {
      return prev.map(project => {
        return project.id === id ? { ...project, name: value } : project
      })
    })
  }

  const updateColor = (value: string) => {
    setProjects(prev => {
      return prev.map(project => {
        return project.id === id ? { ...project, color: value } : project
      })
    })
  }

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
        <div className="w-full h-full">
          {isRenaming ? (
            <Input
              ref={inputRef}
              value={name}
              onChange={e => rename(e.currentTarget.value)}
              onBlur={() => toggleIsRenaming(false)}
              className="inline-flex w-full h-full items-center text-center font-bold text-base text-foreground bg-transparent  border-none focus:border-none"
            />
          ) : (
            <Button
              className={cn(
                `inline-flex w-full h-full items-center justify-center font-bold text-base text-foreground bg-transparent hover:bg-transparent disabled:opacity-100 select-none`,
                isArchived ? 'disabled:cursor-default' : 'disabled:cursor-pointer'
              )}
              disabled={isArchived}
              onClick={addProjectToFocusPeriod}
            >
              {name}
            </Button>
          )}
        </div>

        <div className="absolute top-2 right-3 flex items-center gap-2">
          <DropdownMenu open={showMenu} onOpenChange={setShowMenu} modal={false}>
            <DropdownMenuTrigger>
              <EllipsisIcon className="w-6 h-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()}>
              <DropdownMenuItem onSelect={() => toggleIsRenaming(true)}>
                <Edit3Icon className="mr-2 h-4 w-4" />
                <span>Rename</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => openRecoloring()}>
                <div className="mr-2 w-4 h-4" style={{ backgroundColor: color }} />
                <span>Change Color</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={toggleArchiveProject}>
                {isArchived ? (
                  <ArchiveRestoreIcon className="mr-2 w-4 h-4" />
                ) : (
                  <ArchiveIcon className="mr-2 w-4 h-4" />
                )}

                <span>{isArchived ? 'Unarchive' : 'Archive'} </span>
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={toggleShowDeleteConfirmation}>
                <Trash2Icon className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <input */}
          {/*   type="color" */}
          {/*   value={color} */}
          {/*   onChange={e => updateColor(e.target.value)} */}
          {/*   className="min-w-1 w-4 min-h-1 h-4" */}
          {/* /> */}
        </div>
      </div>

      <Popover open={isRecoloring} onOpenChange={setIsRecoloring}>
        <PopoverAnchor />
        <PopoverContent
          onOpenAutoFocus={e => e.preventDefault()}
          className="w-full p-0 bg-transparent border-none"
        >
          <ColorPicker
            theme={themes.dark}
            color={color}
            onChange={color => updateColor(color.hex)}
            hideAlpha
            presets={colors}
          />
        </PopoverContent>
      </Popover>

      {/* {editing && <EditProject project={project} />} */}

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
