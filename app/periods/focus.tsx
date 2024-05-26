'use client'

import { UpdateBgButton } from '../bg/update-bg-button'
import { ActivePeriods } from './active-periods'
import { PastPeriods } from './past-periods'
import { ClientOnly } from '@/lib/client-only'

// <ClientOnly/> is required by Jotai when using atomWithStorage with nextjs
// https://jotai.org/docs/utilities/storage#server-side-rendering

export const Focus = () => {
  return (
    <ClientOnly>
      <section className="max-w-[900px] w-[80%] mx-auto mb-64 flex flex-col">
        <ActivePeriods />
        <PastPeriods />
      </section>
      <UpdateBgButton />
    </ClientOnly>
  )
}
