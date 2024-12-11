import { QsTransitionArgs } from './qsTypes'
import { transitionArgsStrict } from './types'

export const addDefaultsToTransitionArgs = (
  customConfig?: QsTransitionArgs
): transitionArgsStrict => {
  const defaults: transitionArgsStrict = {
    durationInMiliSeconds: 3000,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}
