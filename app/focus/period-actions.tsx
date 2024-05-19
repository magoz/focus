import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { focusPeriodsAtom } from '@/lib/local-state'
import { FocusPeriodWithProjects } from '@/lib/types'
import { useAtom } from 'jotai'
import { EllipsisIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

type Props = {
  focusPeriodWithProjects: FocusPeriodWithProjects
}

export const FocusPeriodActions = ({ focusPeriodWithProjects }: Props) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [, setFocusPeriods] = useAtom(focusPeriodsAtom)
  const { id } = focusPeriodWithProjects

  const deleteFocusPeriod = () => {
    setFocusPeriods(prev => {
      return prev.filter(p => p.id !== id)
    })
  }

  return (
    <>
      <DropdownMenu open={showMenu} onOpenChange={setShowMenu} modal={false}>
        <DropdownMenuTrigger>
          <EllipsisIcon className="w-6 h-6" />
        </DropdownMenuTrigger>

        <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()}>
          {/* <DropdownMenuItem onSelect={toggleArchiveProject}> */}
          {/*   {isArchived ? ( */}
          {/*     <ArchiveRestoreIcon className="mr-2 w-4 h-4" /> */}
          {/*   ) : ( */}
          {/*     <ArchiveIcon className="mr-2 w-4 h-4" /> */}
          {/*   )} */}
          {/**/}
          {/*   <span>{isArchived ? 'Unarchive' : 'Archive'} </span> */}
          {/* </DropdownMenuItem> */}

          <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
            <Trash2Icon className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="p-12">
          <AlertDialogHeader>
            <AlertDialogTitle className=" mb-4 text-3xl text-center">You Sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-center">
              You will lose focus 🙃 <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-4 mt-4">
            <Button
              className="w-1/2"
              variant="outline"
              size="xl"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={deleteFocusPeriod} className="w-1/2" size="xl" variant="destructive">
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
