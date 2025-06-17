import { QsLineConfig } from '../../linear/linearLine/qsTypes'
import { LineConfigStrict } from '../../linear/linearLine/types'
import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
  QsEnumScaleType,
} from '../enums/qsEnums'
import { addDefaultsToConfig } from './addDefaultsToConfig'

describe('addDefaultsToConfig', () => {
  const defaultConfig: LineConfigStrict = {
    scaleType: QsEnumScaleType.LINEAR,
    curve: QsEnumCurve.LINEAR,
    defaultStrokeColor: 'black',
    defaultStrokeWidth: 1,
    defaultStrokeOpacity: 1,
    strokeLineJoin: QsEnumLineJoin.MITER,
    strokeLineCap: QsEnumLineCap.BUTT,
  }

  it('merges storeConfig and customConfig into defaults', () => {
    const storeConfig: QsLineConfig = {
      curve: QsEnumCurve.NATURAL,
      defaultStrokeWidth: 2,
    }
    const customConfig: QsLineConfig = {
      defaultStrokeOpacity: 0.8,
      scaleType: QsEnumScaleType.BANDED,
    }

    const result = addDefaultsToConfig<LineConfigStrict>(
      { ...defaultConfig },
      customConfig,
      storeConfig
    )

    expect(result).toEqual({
      scaleType: QsEnumScaleType.BANDED,
      curve: QsEnumCurve.NATURAL,
      defaultStrokeColor: 'black',
      defaultStrokeWidth: 2,
      defaultStrokeOpacity: 0.8,
      strokeLineJoin: QsEnumLineJoin.MITER,
      strokeLineCap: QsEnumLineCap.BUTT,
    })
  })

  it('merges only storeConfig into defaults when customConfig is undefined', () => {
    const storeConfig: QsLineConfig = {
      curve: QsEnumCurve.NATURAL,
      defaultStrokeWidth: 2,
    }

    const result = addDefaultsToConfig<LineConfigStrict>(
      { ...defaultConfig },
      undefined,
      storeConfig
    )

    expect(result).toEqual({
      scaleType: QsEnumScaleType.LINEAR,
      curve: QsEnumCurve.NATURAL,
      defaultStrokeColor: 'black',
      defaultStrokeWidth: 2,
      defaultStrokeOpacity: 1,
      strokeLineJoin: QsEnumLineJoin.MITER,
      strokeLineCap: QsEnumLineCap.BUTT,
    })
  })

  it('merges only customConfig into defaults when storeConfig is undefined', () => {
    const customConfig: QsLineConfig = {
      defaultStrokeOpacity: 0.8,
      scaleType: QsEnumScaleType.LINEAR,
    }

    const result = addDefaultsToConfig<LineConfigStrict>(
      { ...defaultConfig },
      customConfig,
      undefined
    )

    expect(result).toEqual({
      scaleType: QsEnumScaleType.LINEAR,
      curve: QsEnumCurve.LINEAR,
      defaultStrokeColor: 'black',
      defaultStrokeWidth: 1,
      defaultStrokeOpacity: 0.8,
      strokeLineJoin: QsEnumLineJoin.MITER,
      strokeLineCap: QsEnumLineCap.BUTT,
    })
  })

  it('returns defaults unchanged when both storeConfig and customConfig are undefined', () => {
    const result = addDefaultsToConfig<LineConfigStrict>(
      { ...defaultConfig },
      undefined,
      undefined
    )

    expect(result).toEqual(defaultConfig)
  })

  it('handles additional properties via index signature', () => {
    const storeConfig: QsLineConfig = {
      customProperty: 'extra',
    }
    const customConfig: QsLineConfig = {
      anotherProperty: 123,
    }

    const result = addDefaultsToConfig<LineConfigStrict>(
      { ...defaultConfig },
      customConfig,
      storeConfig
    )

    expect(result).toEqual({
      ...defaultConfig,
      customProperty: 'extra',
      anotherProperty: 123,
    })
  })

  it('customConfig overwrites storeConfig when both are supplied', () => {
    const storeConfig: QsLineConfig = {
      scaleType: QsEnumScaleType.LINEAR,
      defaultStrokeWidth: 2,
    }
    const customConfig: QsLineConfig = {
      scaleType: QsEnumScaleType.BANDED,
      defaultStrokeWidth: 3,
    }

    const result = addDefaultsToConfig<LineConfigStrict>(
      { ...defaultConfig },
      customConfig,
      storeConfig
    )

    expect(result).toEqual({
      scaleType: QsEnumScaleType.BANDED,
      curve: QsEnumCurve.LINEAR,
      defaultStrokeColor: 'black',
      defaultStrokeWidth: 3,
      defaultStrokeOpacity: 1,
      strokeLineJoin: QsEnumLineJoin.MITER,
      strokeLineCap: QsEnumLineCap.BUTT,
    })
  })
})
