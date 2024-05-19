'use client'

import { AddProject } from '../projects/add'
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
        <section className="flex flex-col gap-8">
          <ActiveProjects />
          <PastFocus />
        </section>
        <section className="col-start-2 flex flex-col gap-4">
          <h3 className="text-2xl font-bold mb-4">Projects</h3>
          <ProjectList />
          <AddProject />
        </section>
        <section className="col-start-2 flex flex-col gap-4">
          <h3 className="text-2xl font-bold mb-4">Archived</h3>
          <ArchivedProjects />
        </section>
      </main>
    </ClientOnly>
  )
}
