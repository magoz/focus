import {
  AlertDialog,
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
import { PeriodWithProjects } from '@/lib/types'
import { useFocus } from '@/lib/use-focus'
import { CircleDotIcon, EllipsisIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

type Props = {
  focusPeriodWithProjects: PeriodWithProjects
}

export const FocusPeriodActions = ({ focusPeriodWithProjects }: Props) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { deletePeriod, focusPeriod } = useFocus()
  const { id } = focusPeriodWithProjects

  return (
    <>
      <DropdownMenu open={showMenu} onOpenChange={setShowMenu} modal={false}>
        <DropdownMenuTrigger>
          <EllipsisIcon className="w-6 h-6" />
        </DropdownMenuTrigger>

        <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()}>
          <DropdownMenuItem onSelect={() => focusPeriod(id)}>
            <CircleDotIcon className="mr-2 h-4 w-4" />
            <span>Focus</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
            <Trash2Icon className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="p-12">
          <AlertDialogHeader>
            <AlertDialogTitle className=" mb-4 text-3xl text-center">
              Delete Focus Period?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-center">
              You will lose focus 🙃 <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-4 mt-6">
            <Button
              className="w-1/2"
              variant="outline"
              size="xl"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => deletePeriod(id)}
              className="w-1/2"
              size="xl"
              variant="destructive"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
