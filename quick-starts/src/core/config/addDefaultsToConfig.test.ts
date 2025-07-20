import { QsLineConfig } from '../../orthogonal/orthogonalLine/qsTypes'
import { LineConfig } from '../../orthogonal/orthogonalLine/types'
import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
  QsEnumScaleType,
} from '../enums/qsEnums'
import { addDefaultsToConfig } from './addDefaultsToConfig'

describe('addDefaultsToConfig', () => {
  // Define constants for test inputs
  const defaultConfig: LineConfig = {
    useDataArea: true,
    scaleType: QsEnumScaleType.orthogonal,
    curve: QsEnumCurve.orthogonal,
    defaultStrokeColor: 'black',
    defaultStrokeWidth: 1,
    defaultStrokeOpacity: 1,
    strokeLineJoin: QsEnumLineJoin.MITER,
    strokeLineCap: QsEnumLineCap.BUTT,
  }

  const storeConfigWithCurveAndWidth: QsLineConfig = {
    curve: QsEnumCurve.NATURAL,
    defaultStrokeWidth: 2,
  }

  const customConfigWithOpacityAndScale: QsLineConfig = {
    defaultStrokeOpacity: 0.8,
    scaleType: QsEnumScaleType.BANDED,
  }

  const customConfigWithOpacityAndorthogonalScale: QsLineConfig = {
    defaultStrokeOpacity: 0.8,
    scaleType: QsEnumScaleType.orthogonal,
  }

  const storeConfigWithCustomProperty: QsLineConfig = {
    customProperty: 'extra',
  }

  const customConfigWithAnotherProperty: QsLineConfig = {
    anotherProperty: 123,
  }

  const storeConfigWithorthogonalScaleAndWidth: QsLineConfig = {
    scaleType: QsEnumScaleType.orthogonal,
    defaultStrokeWidth: 2,
  }

  const customConfigWithBandedScaleAndWidth: QsLineConfig = {
    scaleType: QsEnumScaleType.BANDED,
    defaultStrokeWidth: 3,
  }

  // Define expected results as constants
  const expectedWithBothConfigs: LineConfig = {
    useDataArea: true,
    scaleType: QsEnumScaleType.BANDED,
    curve: QsEnumCurve.NATURAL,
    defaultStrokeColor: 'black',
    defaultStrokeWidth: 2,
    defaultStrokeOpacity: 0.8,
    strokeLineJoin: QsEnumLineJoin.MITER,
    strokeLineCap: QsEnumLineCap.BUTT,
  }

  const expectedWithOnlyStoreConfig: LineConfig = {
    useDataArea: true,
    scaleType: QsEnumScaleType.orthogonal,
    curve: QsEnumCurve.NATURAL,
    defaultStrokeColor: 'black',
    defaultStrokeWidth: 2,
    defaultStrokeOpacity: 1,
    strokeLineJoin: QsEnumLineJoin.MITER,
    strokeLineCap: QsEnumLineCap.BUTT,
  }

  const expectedWithOnlyCustomConfig: LineConfig = {
    useDataArea: true,
    scaleType: QsEnumScaleType.orthogonal,
    curve: QsEnumCurve.orthogonal,
    defaultStrokeColor: 'black',
    defaultStrokeWidth: 1,
    defaultStrokeOpacity: 0.8,
    strokeLineJoin: QsEnumLineJoin.MITER,
    strokeLineCap: QsEnumLineCap.BUTT,
  }

  const expectedWithExtraProperties: LineConfig & {
    customProperty?: string
    anotherProperty?: number
  } = {
    ...defaultConfig,
    customProperty: 'extra',
    anotherProperty: 123,
  }

  const expectedWithCustomConfigOverride: LineConfig = {
    useDataArea: true,
    scaleType: QsEnumScaleType.BANDED,
    curve: QsEnumCurve.orthogonal,
    defaultStrokeColor: 'black',
    defaultStrokeWidth: 3,
    defaultStrokeOpacity: 1,
    strokeLineJoin: QsEnumLineJoin.MITER,
    strokeLineCap: QsEnumLineCap.BUTT,
  }

  beforeEach(() => {
    // Reset any mocks or state before each test (none needed here, but included for consistency)
    jest.clearAllMocks()
  })

  test.each`
    description                                                     | defaults         | customConfig                                 | storeConfig                               | expectedResult
    ${'merges storeConfig and customConfig into defaults'}          | ${defaultConfig} | ${customConfigWithOpacityAndScale}           | ${storeConfigWithCurveAndWidth}           | ${expectedWithBothConfigs}
    ${'merges only storeConfig when customConfig is undefined'}     | ${defaultConfig} | ${undefined}                                 | ${storeConfigWithCurveAndWidth}           | ${expectedWithOnlyStoreConfig}
    ${'merges only customConfig when storeConfig is undefined'}     | ${defaultConfig} | ${customConfigWithOpacityAndorthogonalScale} | ${undefined}                              | ${expectedWithOnlyCustomConfig}
    ${'returns defaults unchanged when both configs are undefined'} | ${defaultConfig} | ${undefined}                                 | ${undefined}                              | ${defaultConfig}
    ${'handles additional properties via index signature'}          | ${defaultConfig} | ${customConfigWithAnotherProperty}           | ${storeConfigWithCustomProperty}          | ${expectedWithExtraProperties}
    ${'customConfig overwrites storeConfig when both are supplied'} | ${defaultConfig} | ${customConfigWithBandedScaleAndWidth}       | ${storeConfigWithorthogonalScaleAndWidth} | ${expectedWithCustomConfigOverride}
  `(
    '$description',
    ({ defaults, customConfig, storeConfig, expectedResult }) => {
      // Create deep copies to compare inputs before and after
      const originalDefaults = { ...defaults }
      const originalCustomConfig = customConfig
        ? { ...customConfig }
        : undefined
      const originalStoreConfig = storeConfig ? { ...storeConfig } : undefined

      // Call the function
      const result = addDefaultsToConfig<LineConfig>(
        { ...defaults },
        customConfig,
        storeConfig
      )

      // Verify the result
      expect(result).toEqual(expectedResult)

      // Assert that inputs are unchanged
      expect(defaults).toEqual(originalDefaults)
      if (customConfig !== undefined) {
        expect(customConfig).toEqual(originalCustomConfig)
      }
      if (storeConfig !== undefined) {
        expect(storeConfig).toEqual(originalStoreConfig)
      }
    }
  )
})
