import { dbSyncAppDataAction, dbUpdateAppDataAction } from '@/lib/data/actions'
import { focusAtom } from '@/lib/local-state'
import { FocusApp } from '@/lib/types'
import { useAuth } from '@clerk/nextjs'
import { useAtom } from 'jotai'
import { useRef, useEffect, useCallback } from 'react'
import { isEqual } from 'lodash'
import { mightFail } from 'might-fail'
import { useVisibilityChange } from '@uidotdev/usehooks'
import { getCurrentUTCTimestamp } from '@/lib/utils'

export const useSyncDb = () => {
  const { userId } = useAuth()
  const [appData] = useAtom(focusAtom)
  const prevAppDataRef = useRef<FocusApp>()
  const documentVisible = useVisibilityChange()

  const dbUpdate = useCallback(
    async (appData: FocusApp) => {
      if (!userId) return
      const { error } = await mightFail(dbUpdateAppDataAction({ user: userId, data: appData }))
      if (error) {
        console.error(`Error dbUpdateAppDataAction: ${error}`)
        return
      }
      console.log('Updated DB')
    },
    [userId]
  )
  const dbSync = useCallback(async () => {
    if (!userId) return
    const { error } = await mightFail(dbSyncAppDataAction({ user: userId, data: appData }))
    if (error) {
      console.error(`Error dbSyncAppDataAction: ${error}`)
      return
    }
    console.log('Synced DB')
  }, [userId])

  // Update db when appData changes
  useEffect(() => {
    if (prevAppDataRef.current && !isEqual(prevAppDataRef.current, appData)) {
      dbUpdate(appData)
    }
    prevAppDataRef.current = appData
  }, [appData, dbUpdate])

  useEffect(() => {
    if (documentVisible) {
      console.log(getCurrentUTCTimestamp())
      console.log('should sync')
      dbSync()
    }
  }, [documentVisible])

  if (!userId) return null
}
