import { QsLegendConfig } from '../../../unbound/legend/qsTypes'
import { QsAreaConfig } from '../../../linear/linearArea/qsTypes'
import { QsAxisConfig } from '../../../linear/linearAxis/qsTypes'
import { QsBarConfig } from '../../../linear/linearBar/qsTypes'
import { QsBarGroupConfig } from '../../../linear/linearBarGroup/qsTypes'
import { QsBarStackedConfig } from '../../../linear/linearBarStack/qsTypes'
import { QsLineConfig } from '../../../linear/linearLine/qsTypes'
import { QsPointsConfig } from '../../../linear/linearPoints/qsTypes'
import { QsTextConfig } from '../../../linear/linearText/qsTypes'
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
    linearAreaConfig: undefined,
    linearAxisConfigTop: undefined,
    linearAxisConfigBottom: undefined,
    linearAxisConfigLeft: undefined,
    linearAxisConfigRight: undefined,
    linearBarConfig: undefined,
    linearBarGroupConfig: undefined,
    linearBarStackConfig: undefined,
    linearLineConfig: undefined,
    linearPointsConfig: undefined,
    linearTextConfig: undefined,
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
      linear: {
        areaConfig: jest.fn().mockImplementation(() => store.linearAreaConfig),
        axisConfigTop: jest
          .fn()
          .mockImplementation(() => store.linearAxisConfigTop),
        axisConfigBottom: jest
          .fn()
          .mockImplementation(() => store.linearAxisConfigBottom),
        axisConfigLeft: jest
          .fn()
          .mockImplementation(() => store.linearAxisConfigLeft),
        axisConfigRight: jest
          .fn()
          .mockImplementation(() => store.linearAxisConfigRight),
        barConfig: jest.fn().mockImplementation(() => store.linearBarConfig),
        barGroupConfig: jest
          .fn()
          .mockImplementation(() => store.linearBarGroupConfig),
        barStackConfig: jest
          .fn()
          .mockImplementation(() => store.linearBarStackConfig),
        lineConfig: jest.fn().mockImplementation(() => store.linearLineConfig),
        pointsConfig: jest
          .fn()
          .mockImplementation(() => store.linearPointsConfig),
        textConfig: jest.fn().mockImplementation(() => store.linearTextConfig),
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
      linear: {
        areaConfig: jest.fn().mockImplementation((value: QsAreaConfig) => {
          store.linearAreaConfig = value
        }),
        axisConfigTop: jest.fn().mockImplementation((value: QsAxisConfig) => {
          store.linearAxisConfigTop = value
        }),
        axisConfigBottom: jest
          .fn()
          .mockImplementation((value: QsAxisConfig) => {
            store.linearAxisConfigBottom = value
          }),
        axisConfigLeft: jest.fn().mockImplementation((value: QsAxisConfig) => {
          store.linearAxisConfigLeft = value
        }),
        axisConfigRight: jest.fn().mockImplementation((value: QsAxisConfig) => {
          store.linearAxisConfigRight = value
        }),
        barConfig: jest.fn().mockImplementation((value: QsBarConfig) => {
          store.linearBarConfig = value
        }),
        barGroupConfig: jest
          .fn()
          .mockImplementation((value: QsBarGroupConfig) => {
            store.linearBarGroupConfig = value
          }),
        barStackConfig: jest
          .fn()
          .mockImplementation((value: QsBarStackedConfig) => {
            store.linearBarStackConfig = value
          }),
        lineConfig: jest.fn().mockImplementation((value: QsLineConfig) => {
          store.linearLineConfig = value
        }),
        pointsConfig: jest.fn().mockImplementation((value: QsPointsConfig) => {
          store.linearPointsConfig = value
        }),
        textConfig: jest.fn().mockImplementation((value: QsTextConfig) => {
          store.linearTextConfig = value
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
