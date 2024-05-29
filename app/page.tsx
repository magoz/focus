import { ClientOnly } from '@/lib/client-only'
import { Focus } from './periods/focus'
import { currentUser } from '@clerk/nextjs/server'
import { dbGetAppData } from '@/lib/data/data'

// <ClientOnly/> is required by Jotai when using atomWithStorage with nextjs
// https://jotai.org/docs/utilities/storage#server-side-rendering

export default async function Home() {
  const user = await currentUser()
  const userId = user ? user.id : null
  const appData = userId ? await dbGetAppData(userId) : null

  return (
    <ClientOnly>
      <Focus appData={appData} />
    </ClientOnly>
  )
}
