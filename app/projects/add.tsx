'use client'

import { Button } from '@/components/ui/button'

export const AddProject = () => {
  const onAdd = () => {
    console.log('click!!')
  }

  return <Button onClick={onAdd}>Add Project</Button>
}
