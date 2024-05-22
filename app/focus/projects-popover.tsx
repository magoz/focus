import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ProjectList } from '../projects/list'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export const ProjectsPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="xl" className="h-12 aspect-square p-0 rounded-full">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <ProjectList />
      </PopoverContent>
    </Popover>
  )
}
