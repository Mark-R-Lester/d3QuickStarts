import { QsTransitionArgs } from './types/qsTypes'
import { transitionArgsStrict } from './types/types'

export const addTransitionDefaults = (
  customConfig?: QsTransitionArgs
): transitionArgsStrict => {
  const defaults: transitionArgsStrict = {
    delayInMiliSeconds: 150,
    durationInMiliSeconds: 3000,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}
