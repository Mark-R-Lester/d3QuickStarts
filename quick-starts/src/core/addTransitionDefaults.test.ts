import { addTransitionDefaults } from './addTransitionDefaults'
import { QsTransitionArgs } from './types/qsTypes'

describe('addTransitionDefaults', () => {
  test('empty transition args is populated with defaults', () => {
    const args: QsTransitionArgs = {}
    expect(addTransitionDefaults(args)).toEqual({
      delayInMiliSeconds: 0,
      durationInMiliSeconds: 3000,
    })
  })

  test('transition args is updated with missing properties only', () => {
    const args: QsTransitionArgs = { delayInMiliSeconds: 200 }
    expect(addTransitionDefaults(args)).toEqual({
      delayInMiliSeconds: 200,
      durationInMiliSeconds: 3000,
    })
  })
})
