'use client'

import { ProjectList } from '../projects/list'
import { ActiveFocus } from './active-panels'

export const Focus = () => {
  return (
    <main className="w-screen grid grid-cols-[3fr,1fr] gap-16 p-16">
      <ActiveFocus />
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold mb-4">Projects</h3>
        <ProjectList />
      </section>
    </main>
  )
}
