'use client'

import { UpdateBgButton } from '../bg/update-bg-button'
import { ActivePeriods } from './active-periods'
import { PastPeriods } from './past-periods'
import { useSyncDb } from './use-sync-db'
import { useEffect } from 'react'
import { FocusApp } from '@/lib/types'
import { focusAtom } from '@/lib/local-state'
import { useAtom } from 'jotai'
import { isAfter } from 'date-fns'

type Props = {
  appData: FocusApp | null
}

export const Focus = ({ appData: serverAppData }: Props) => {
  const [, setAppData] = useAtom(focusAtom)
  useSyncDb()

  // Update appData if serverAppData is newer
  useEffect(() => {
    if (!serverAppData) return

    setAppData(prev => {
      const isServerAppDataNewer = isAfter(
        new Date(serverAppData.lastEdit),
        new Date(prev.lastEdit)
      )
      return isServerAppDataNewer ? serverAppData : prev
    })
  }, [])

  return (
    <>
      <section className="max-w-[900px] w-[80%] mx-auto mb-64 flex flex-col">
        <ActivePeriods />
        <PastPeriods />
      </section>
      <UpdateBgButton />
    </>
  )
}
