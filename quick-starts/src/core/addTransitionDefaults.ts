import { QsTransitionArgs } from './types/qsTypes'
import { transitionArgs } from './types/types'

export const addTransitionDefaults = (
  customConfig?: QsTransitionArgs
): transitionArgs => {
  const defaults: transitionArgs = {
    delayInMiliSeconds: 0,
    durationInMiliSeconds: 3000,
  }

  return {
    ...defaults,
    ...customConfig,
  }
}
