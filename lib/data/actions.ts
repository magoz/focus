'use server'

import { FocusApp } from '../types'
import { dbSetAppData, dbSyncAppData } from './data'

export async function dbUpdateAppDataAction({ user, data }: { user: string; data: FocusApp }) {
  return await dbSetAppData({ user, data })
}

export async function dbSyncAppDataAction({ user, data }: { user: string; data: FocusApp }) {
  return await dbSyncAppData({ user, data })
}
