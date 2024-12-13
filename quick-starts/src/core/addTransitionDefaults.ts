import { QsTransitionArgs } from './qsTypes'
import { transitionArgsStrict } from './types'

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
