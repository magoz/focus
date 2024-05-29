import { atomWithStorage } from 'jotai/utils'
import { getAppDefaults } from './defaults'
import { FocusApp } from './types'

export const focusAtom = atomWithStorage<FocusApp>('focus', getAppDefaults(), undefined, {
  getOnInit: true
})
