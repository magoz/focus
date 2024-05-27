'use client'

import { ClientOnly } from '@/lib/client-only'
import { useFocus } from '@/lib/use-focus'
import { cn } from '@/lib/utils'

export const BgImage = () => {
  const {
    settings: { bgImage }
  } = useFocus()

  return (
    <ClientOnly>
      <div
        key={bgImage}
        className={cn(
          'fixed top-0 left-0 w-full h-full bg-cover opacity-60 blur-lg animate-bg-image-fade-in',
          bgImage === 'sky' ? 'bg-bottom' : 'bg-center'
        )}
        style={{
          backgroundImage: `url(/${bgImage}.jpg)`
        }}
      />
    </ClientOnly>
  )
}
