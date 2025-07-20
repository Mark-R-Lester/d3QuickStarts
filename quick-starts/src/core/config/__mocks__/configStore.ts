import { QsLegendConfig } from '../../../unbound/legend/qsTypes'
import { QsAreaConfig } from '../../../orthogonal/orthogonalArea/qsTypes'
import { QsAxisConfig } from '../../../orthogonal/orthogonalAxis/qsTypes'
import { QsBarConfig } from '../../../orthogonal/orthogonalBar/qsTypes'
import { QsBarGroupConfig } from '../../../orthogonal/orthogonalBarGroup/qsTypes'
import { QsBarStackedConfig } from '../../../orthogonal/orthogonalBarStack/qsTypes'
import { QsLineConfig } from '../../../orthogonal/orthogonalLine/qsTypes'
import { QsPointsConfig } from '../../../orthogonal/orthogonalPoints/qsTypes'
import { QsTextConfig } from '../../../orthogonal/orthogonalText/qsTypes'
import { QsPlottedLineConfig } from '../../../plots/plottedLine/qsTypes'
import { QsPlottedPointsConfig } from '../../../plots/plottedPoints/qsTypes'
import { QsPlottedTextConfig } from '../../../plots/plottedText/qsTypes'
import { QsRadialArcConfig } from '../../../radialArc/radialArc/qsTypes'
import { QsRadialArcTextConfig } from '../../../radialArc/radialArcText/qsTypes'
import { QsRadialAreaConfig } from '../../../radialCentroid/radialCentroidArea/qsTypes'
import { QsRadialAxisConfig } from '../../../radialCentroid/radialCentroidAxis/qsTypes'
import { QsRadialLineConfig } from '../../../radialCentroid/radialCentroidLine/qsTypes'
import { QsRadialPointsConfig } from '../../../radialCentroid/radialCentroidPoints/qsTypes'
import { QsRadialSpokesConfig } from '../../../radialCentroid/radialCentroidSpokes/qsTypes'

import { QsRadialTextConfig } from '../../../radialCentroid/radialCentroidText/qsTypes'
import { ConfigStore } from '../configStore.class'

export const createMockConfigStore = () => {
  const store: ConfigStore = {
    legendConfig: undefined,
    orthogonalAreaConfig: undefined,
    orthogonalAxisConfigTop: undefined,
    orthogonalAxisConfigBottom: undefined,
    orthogonalAxisConfigLeft: undefined,
    orthogonalAxisConfigRight: undefined,
    orthogonalBarConfig: undefined,
    orthogonalBarGroupConfig: undefined,
    orthogonalBarStackConfig: undefined,
    orthogonalLineConfig: undefined,
    orthogonalPointsConfig: undefined,
    orthogonalTextConfig: undefined,
    plottedLineConfig: undefined,
    plottedPointsConfig: undefined,
    plottedTextConfig: undefined,
    radialArcConfig: undefined,
    radialArcTextConfigRotated: undefined,
    radialArcTextConfigHorizontal: undefined,
    radialArcTextConfigSpoke: undefined,
    radialArcTextConfigFollow: undefined,
    radialCentroidAreaConfig: undefined,
    radialCentroidAxisConfig: undefined,
    radialCentroidLineConfig: undefined,
    radialCentroidPointsConfig: undefined,
    radialCentroidSpokesConfig: undefined,
    radialCentroidTextConfig: undefined,
  }

  return {
    getters: {
      legend: {
        legendConfig: jest.fn().mockImplementation(() => store.legendConfig),
      },
      orthogonal: {
        areaConfig: jest
          .fn()
          .mockImplementation(() => store.orthogonalAreaConfig),
        axisConfigTop: jest
          .fn()
          .mockImplementation(() => store.orthogonalAxisConfigTop),
        axisConfigBottom: jest
          .fn()
          .mockImplementation(() => store.orthogonalAxisConfigBottom),
        axisConfigLeft: jest
          .fn()
          .mockImplementation(() => store.orthogonalAxisConfigLeft),
        axisConfigRight: jest
          .fn()
          .mockImplementation(() => store.orthogonalAxisConfigRight),
        barConfig: jest
          .fn()
          .mockImplementation(() => store.orthogonalBarConfig),
        barGroupConfig: jest
          .fn()
          .mockImplementation(() => store.orthogonalBarGroupConfig),
        barStackConfig: jest
          .fn()
          .mockImplementation(() => store.orthogonalBarStackConfig),
        lineConfig: jest
          .fn()
          .mockImplementation(() => store.orthogonalLineConfig),
        pointsConfig: jest
          .fn()
          .mockImplementation(() => store.orthogonalPointsConfig),
        textConfig: jest
          .fn()
          .mockImplementation(() => store.orthogonalTextConfig),
      },
      plotted: {
        lineConfig: jest.fn().mockImplementation(() => store.plottedLineConfig),
        pointsConfig: jest
          .fn()
          .mockImplementation(() => store.plottedPointsConfig),
        textConfig: jest.fn().mockImplementation(() => store.plottedTextConfig),
      },
      radialArc: {
        arcConfig: jest.fn().mockImplementation(() => store.radialArcConfig),
        textConfigRotated: jest
          .fn()
          .mockImplementation(() => store.radialArcTextConfigRotated),
        textConfigHorizontal: jest
          .fn()
          .mockImplementation(() => store.radialArcTextConfigHorizontal),
        textConfigSpoke: jest
          .fn()
          .mockImplementation(() => store.radialArcTextConfigSpoke),
        textConfigFollow: jest
          .fn()
          .mockImplementation(() => store.radialArcTextConfigFollow),
      },
      radialCentroid: {
        areaConfig: jest
          .fn()
          .mockImplementation(() => store.radialCentroidAreaConfig),
        axisConfig: jest
          .fn()
          .mockImplementation(() => store.radialCentroidAxisConfig),
        lineConfig: jest
          .fn()
          .mockImplementation(() => store.radialCentroidLineConfig),
        pointsConfig: jest
          .fn()
          .mockImplementation(() => store.radialCentroidPointsConfig),
        spokesConfig: jest
          .fn()
          .mockImplementation(() => store.radialCentroidSpokesConfig),
        textConfig: jest
          .fn()
          .mockImplementation(() => store.radialCentroidTextConfig),
      },
    },
    setters: {
      legend: {
        legendConfig: jest.fn().mockImplementation((value: QsLegendConfig) => {
          store.legendConfig = value
        }),
      },
      orthogonal: {
        areaConfig: jest.fn().mockImplementation((value: QsAreaConfig) => {
          store.orthogonalAreaConfig = value
        }),
        axisConfigTop: jest.fn().mockImplementation((value: QsAxisConfig) => {
          store.orthogonalAxisConfigTop = value
        }),
        axisConfigBottom: jest
          .fn()
          .mockImplementation((value: QsAxisConfig) => {
            store.orthogonalAxisConfigBottom = value
          }),
        axisConfigLeft: jest.fn().mockImplementation((value: QsAxisConfig) => {
          store.orthogonalAxisConfigLeft = value
        }),
        axisConfigRight: jest.fn().mockImplementation((value: QsAxisConfig) => {
          store.orthogonalAxisConfigRight = value
        }),
        barConfig: jest.fn().mockImplementation((value: QsBarConfig) => {
          store.orthogonalBarConfig = value
        }),
        barGroupConfig: jest
          .fn()
          .mockImplementation((value: QsBarGroupConfig) => {
            store.orthogonalBarGroupConfig = value
          }),
        barStackConfig: jest
          .fn()
          .mockImplementation((value: QsBarStackedConfig) => {
            store.orthogonalBarStackConfig = value
          }),
        lineConfig: jest.fn().mockImplementation((value: QsLineConfig) => {
          store.orthogonalLineConfig = value
        }),
        pointsConfig: jest.fn().mockImplementation((value: QsPointsConfig) => {
          store.orthogonalPointsConfig = value
        }),
        textConfig: jest.fn().mockImplementation((value: QsTextConfig) => {
          store.orthogonalTextConfig = value
        }),
      },
      plotted: {
        lineConfig: jest
          .fn()
          .mockImplementation((value: QsPlottedLineConfig) => {
            store.plottedLineConfig = value
          }),
        pointsConfig: jest
          .fn()
          .mockImplementation((value: QsPlottedPointsConfig) => {
            store.plottedPointsConfig = value
          }),
        textConfig: jest
          .fn()
          .mockImplementation((value: QsPlottedTextConfig) => {
            store.plottedTextConfig = value
          }),
      },
      radialArc: {
        arcConfig: jest.fn().mockImplementation((value: QsRadialArcConfig) => {
          store.radialArcConfig = value
        }),
        textConfigRotated: jest
          .fn()
          .mockImplementation((value: QsRadialArcTextConfig) => {
            store.radialArcTextConfigRotated = value
          }),
        textConfigHorizontal: jest
          .fn()
          .mockImplementation((value: QsRadialArcTextConfig) => {
            store.radialArcTextConfigHorizontal = value
          }),
        textConfigSpoke: jest
          .fn()
          .mockImplementation((value: QsRadialArcTextConfig) => {
            store.radialArcTextConfigSpoke = value
          }),
        textConfigFollow: jest
          .fn()
          .mockImplementation((value: QsRadialArcTextConfig) => {
            store.radialArcTextConfigFollow = value
          }),
      },
      radialCentroid: {
        areaConfig: jest
          .fn()
          .mockImplementation((value: QsRadialAreaConfig) => {
            store.radialCentroidAreaConfig = value
          }),
        axisConfig: jest
          .fn()
          .mockImplementation((value: QsRadialAxisConfig) => {
            store.radialCentroidAxisConfig = value
          }),
        lineConfig: jest
          .fn()
          .mockImplementation((value: QsRadialLineConfig) => {
            store.radialCentroidLineConfig = value
          }),
        pointsConfig: jest
          .fn()
          .mockImplementation((value: QsRadialPointsConfig) => {
            store.radialCentroidPointsConfig = value
          }),
        spokesConfig: jest
          .fn()
          .mockImplementation((value: QsRadialSpokesConfig) => {
            store.radialCentroidSpokesConfig = value
          }),
        textConfig: jest
          .fn()
          .mockImplementation((value: QsRadialTextConfig) => {
            store.radialCentroidTextConfig = value
          }),
      },
    },
  }
}
