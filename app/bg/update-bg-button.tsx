'use client'

import { Button } from '@/components/ui/button'
import { useFocus } from '@/lib/use-focus'
import { ShuffleIcon } from 'lucide-react'

export const UpdateBgButton = () => {
  const { updateBackgroundImage } = useFocus()
  return (
    <Button onClick={updateBackgroundImage} variant="icon" className="fixed bottom-0 right-0">
      <ShuffleIcon className="w-4 h-4" />
    </Button>
  )
}
