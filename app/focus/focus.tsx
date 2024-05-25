'use client'

import { UpdateBgButton } from '../bg/update-bg-button'
import { ActiveProjects } from './active-projects'
import { PastFocus } from './focus-past'
import { ClientOnly } from '@/lib/client-only'

// <ClientOnly/> is required by Jotai when using atomWithStorage with nextjs
// https://jotai.org/docs/utilities/storage#server-side-rendering

export const Focus = () => {
  return (
    <ClientOnly>
      <section className="max-w-[900px] w-[80%] mx-auto mb-64 flex flex-col">
        <ActiveProjects />
        <PastFocus />
      </section>
      <UpdateBgButton />
    </ClientOnly>
  )
}
