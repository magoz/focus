import { atomWithStorage } from 'jotai/utils'
import { focusAppDefaults } from './defaults'
import { FocusApp } from './types'

export const focusAtom = atomWithStorage<FocusApp>('focus', focusAppDefaults, undefined, {
  getOnInit: true
})
