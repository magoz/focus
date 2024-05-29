import { isAfter } from 'date-fns'
import { redis } from '../redis-client'
import { FocusApp, FocusAppSchema } from '../types'
import { mightFail } from 'might-fail'
import { z } from 'zod'

////////////////////////////////////////////////////////
// HASH
////////////////////////////////////////////////////////

/////////////////////////////
// UTILS
/////////////////////////////

export const dbGetAppData = async (user: string) => {
  const { error, result } = await mightFail(redis.hget(user, 'data'))
  if (error) {
    console.error('Error getting app data', error)
    return null
  }

  const parsedResult = FocusAppSchema.or(z.null()).safeParse(result)
  if (!parsedResult.success) {
    console.error('Error parsing app data', parsedResult.error)
    return null
  }

  return parsedResult.data
}

export const dbGetLastEdit = async (user: string) => {
  const { error, result } = await mightFail(redis.hget(user, 'lastEdit'))
  if (error) {
    console.error('Error getting lastEdit', error)
    return null
  }

  const parsedResult = z.string().safeParse(result)
  if (!parsedResult.success) {
    console.error('Error parsing lastEdit ', parsedResult.error)
    return null
  }

  return parsedResult.data
}

export const dbSetAppData = async ({ user, data }: { user: string; data: FocusApp }) => {
  const { error } = await mightFail(
    redis.hset(user, {
      lastEdit: data.lastEdit,
      data
    })
  )
  if (error) {
    console.error('Error updating app data', error)
    return null
  }

  console.log('Data updated')
  return data
}

export const dbSyncAppData = async ({ user, data }: { user: string; data: FocusApp }) => {
  const lastEdit = data.lastEdit
  const dbLastEdit = await dbGetLastEdit(user)

  // DB data is newer
  if (dbLastEdit && isAfter(new Date(dbLastEdit), new Date(lastEdit))) {
    const dbData = await dbGetAppData(user)

    // DB data is corrupted
    if (!dbData) {
      await dbSetAppData({ user, data })
      console.error('DB data is corrupted')
      return data
    }

    console.log('DB data is newer')
    return dbData
  }

  // Passed data is newer
  await dbSetAppData({ user, data })
  console.log('Passed data is newer')
  return data
}

/////////////////////////////
/// HASH WITH TRANSACTION
/////////////////////////////

// export const dbUpdateAppData = async ({ user, data }: { user: string; data: FocusApp }) => {
//   const newLastEdit = data.lastEdit
//
//   const { error: errorGetLastEdit, result: dbLastEdit } = await mightFail(
//     redis.hget(user, 'lastEdit')
//   )
//   if (errorGetLastEdit) {
//     console.error('Error getting lastEdit', errorGetLastEdit)
//     return
//   }
//
//   if (typeof dbLastEdit === 'string' && isAfter(new Date(dbLastEdit), new Date(newLastEdit))) {
//     console.log('db data is newer')
//     return
//   }
//
//   const { error } = await mightFail(
//     redis.hset(user, {
//       lastEdit: newLastEdit,
//       data
//     })
//   )
//
//   if (error) {
//     console.error('Error updating app data', error)
//   }
// }

// export const dbGetAppData = async ({ user, lastEdit }: { user: string; lastEdit?: string }) => {
//   // If we don't provide a lastEdit, we get the latest data
//   if (!lastEdit) {
//     const { error, result } = await mightFail(redis.hget(user, 'data'))
//     if (error) {
//       console.error('Error getting app data', error)
//       return null
//     }
//
//     const parsedResult = FocusAppSchema.or(z.null()).safeParse(result)
//     if (!parsedResult.success) {
//       console.error('Error parsing app data', parsedResult.error)
//       return null
//     }
//
//     return parsedResult.data
//   }
//
//   // If we provide a lastEdit, we get the data only if it's newer
//
//   const tx = redis.multi()
//   const dbLastEdit = tx.hget(user, 'lastEdit')
//
//   if (typeof dbLastEdit !== 'string' || isAfter(new Date(lastEdit), new Date(dbLastEdit)))
//     return null
//
//   tx.hget(user, 'data')
//
//   const { error, result } = await mightFail(tx.exec())
//
//   if (error) {
//     console.error('Error updating app data', error)
//   }
//
//   const parsedResult = FocusAppSchema.or(z.null()).safeParse(result)
//   if (!parsedResult.success) {
//     console.error('Error parsing app data', parsedResult.error)
//     return null
//   }
//
//   return parsedResult.data
// }

/////////////////////////////
/// HASH
/////////////////////////////

// export const dbUpdateAppData = async ({ user, data }: { user: string; data: FocusApp }) => {
//   const { error } = await mightFail(
//     redis.hset(user, {
//       lastEdit: data.lastEdit,
//       data
//     })
//   )
//   if (error) {
//     console.error('Error updating app data', error)
//   }
// }
//
// export const dbGetAppData = async ({ user }: { user: string }) => {
//   const { error, result } = await mightFail(redis.hget(user, 'lastEdit'))
//   if (error) {
//     console.error('Error getting app data', error)
//     return null
//   }
//
//   console.log('result', result)
//
//   const parsedResult = FocusAppSchema.safeParse(result)
//   if (!parsedResult.success) {
//     console.error('Error parsing app data', parsedResult.error)
//     return null
//   }
//
//   return parsedResult.data
// }

////////////////////////////////////////////////////////
// STRING
////////////////////////////////////////////////////////

// export const dbUpdateAppData = async ({ user, data }: { user: string; data: FocusApp }) => {
//   const { error } = await mightFail(redis.set(user, data))
//   if (error) {
//     console.error('Error updating app data', error)
//   }
// }
//
// export const dbGetAppData = async ({ user }: { user: string }) => {
//   const { error, result } = await mightFail(redis.get(user))
//   if (error) {
//     console.error('Error getting app data', error)
//     return null
//   }
//
//   const parsedResult = FocusAppSchema.safeParse(result)
//   if (!parsedResult.success) {
//     console.error('Error parsing app data', parsedResult.error)
//     return null
//   }
//
//   return parsedResult.data
// }
