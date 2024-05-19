'use client'

import { ArchivedProjects } from '../projects/archived'
import { ProjectList } from '../projects/list'
import { ActiveProjects } from './active-projects'
import { PastFocus } from './focus-past'
import { ClientOnly } from '@/lib/client-only'

// <ClientOnly/> is required by Jotai when using atomWithStorage with nextjs
// https://jotai.org/docs/utilities/storage#server-side-rendering

export const Focus = () => {
  return (
    <ClientOnly>
      <main className="w-screen grid grid-cols-[3fr,1fr] gap-16 p-16">
        <section className="flex flex-col gap-16">
          <ActiveProjects />
          <PastFocus />
        </section>
        <section className="col-start-2 flex flex-col gap-12">
          <ProjectList />
          <ArchivedProjects />
        </section>
      </main>
    </ClientOnly>
  )
}
