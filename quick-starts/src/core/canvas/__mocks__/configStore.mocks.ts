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
import { QsRadialTextConfig } from '../../../radialArc/radialArcText/qsTypes'
import { QsRadialAreaConfig } from '../../../radialCentroid/radialCentroidArea/qsTypes'
import { QsRadialAxisConfig } from '../../../radialCentroid/radialCentroidAxis/qsTypes'
import { QsRadialLineConfig } from '../../../radialCentroid/radialCentroidLine/qsTypes'
import { QsRadialPointsConfig } from '../../../radialCentroid/radialCentroidPoints/qsTypes'
import { QsRadialSpokesConfig } from '../../../radialCentroid/radialCentroidSpokes/qsTypes'

export interface ConfigStore {
  legendConfig?: QsLegendConfig
  linearAreaConfig?: QsAreaConfig
  linearAxisConfigTop?: QsAxisConfig
  linearAxisConfigBottom?: QsAxisConfig
  linearAxisConfigLeft?: QsAxisConfig
  linearAxisConfigRight?: QsAxisConfig
  linearBarConfig?: QsBarConfig
  linearBarGroupConfig?: QsBarGroupConfig
  linearBarStackConfig?: QsBarStackedConfig
  linearLineConfig?: QsLineConfig
  linearPointsConfig?: QsPointsConfig
  linearTextConfig?: QsTextConfig
  plottedLineConfig?: QsPlottedLineConfig
  plottedPointsConfig?: QsPlottedPointsConfig
  plottedTextConfig?: QsPlottedTextConfig
  radialArcConfig?: QsRadialArcConfig
  radialArcTextConfigRotated?: QsRadialTextConfig
  radialArcTextConfigHorizontal?: QsRadialTextConfig
  radialArcTextConfigSpoke?: QsRadialTextConfig
  radialArcTextConfigFollow?: QsRadialTextConfig
  radialCentroidAreaConfig?: QsRadialAreaConfig
  radialCentroidAxisConfig?: QsRadialAxisConfig
  radialCentroidLineConfig?: QsRadialLineConfig
  radialCentroidPointsConfig?: QsRadialPointsConfig
  radialCentroidSpokesConfig?: QsRadialSpokesConfig
}

export interface ConfigGetters {
  legend: {
    legendConfig: () => QsLegendConfig | undefined
  }
  linear: {
    areaConfig: () => QsAreaConfig | undefined
    axisConfigTop: () => QsAxisConfig | undefined
    axisConfigBottom: () => QsAxisConfig | undefined
    axisConfigLeft: () => QsAxisConfig | undefined
    axisConfigRight: () => QsAxisConfig | undefined
    barConfig: () => QsBarConfig | undefined
    barGroupConfig: () => QsBarGroupConfig | undefined
    barStackConfig: () => QsBarStackedConfig | undefined
    lineConfig: () => QsLineConfig | undefined
    pointsConfig: () => QsPointsConfig | undefined
    textConfig: () => QsTextConfig | undefined
  }
  plotted: {
    lineConfig: () => QsPlottedLineConfig | undefined
    pointsConfig: () => QsPlottedPointsConfig | undefined
    textConfig: () => QsPlottedTextConfig | undefined
  }
  radialArc: {
    arcConfig: () => QsRadialArcConfig | undefined
    textConfigRotated: () => QsRadialTextConfig | undefined
    textConfigHorizontal: () => QsRadialTextConfig | undefined
    textConfigSpoke: () => QsRadialTextConfig | undefined
    textConfigFollow: () => QsRadialTextConfig | undefined
  }
  radialCentroid: {
    areaConfig: () => QsRadialAreaConfig | undefined
    axisConfig: () => QsRadialAxisConfig | undefined
    lineConfig: () => QsRadialLineConfig | undefined
    pointsConfig: () => QsRadialPointsConfig | undefined
    spokesConfig: () => QsRadialSpokesConfig | undefined
  }
}

export interface ConfigSetters {
  legend: {
    legendConfig: (value: QsLegendConfig) => void
  }
  linear: {
    areaConfig: (value: QsAreaConfig) => void
    axisConfigTop: (value: QsAxisConfig) => void
    axisConfigBottom: (value: QsAxisConfig) => void
    axisConfigLeft: (value: QsAxisConfig) => void
    axisConfigRight: (value: QsAxisConfig) => void
    barConfig: (value: QsBarConfig) => void
    barGroupConfig: (value: QsBarGroupConfig) => void
    barStackConfig: (value: QsBarStackedConfig) => void
    lineConfig: (value: QsLineConfig) => void
    pointsConfig: (value: QsPointsConfig) => void
    textConfig: (value: QsTextConfig) => void
  }
  plotted: {
    lineConfig: (value: QsPlottedLineConfig) => void
    pointsConfig: (value: QsPlottedPointsConfig) => void
    textConfig: (value: QsPlottedTextConfig) => void
  }
  radialArc: {
    arcConfig: (value: QsRadialArcConfig) => void
    textConfigRotated: (value: QsRadialTextConfig) => void
    textConfigHorizontal: (value: QsRadialTextConfig) => void
    textConfigSpoke: (value: QsRadialTextConfig) => void
    textConfigFollow: (value: QsRadialTextConfig) => void
  }
  radialCentroid: {
    areaConfig: (value: QsRadialAreaConfig) => void
    axisConfig: (value: QsRadialAxisConfig) => void
    lineConfig: (value: QsRadialLineConfig) => void
    pointsConfig: (value: QsRadialPointsConfig) => void
    spokesConfig: (value: QsRadialSpokesConfig) => void
  }
}

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
          .mockImplementation((value: QsRadialTextConfig) => {
            store.radialArcTextConfigRotated = value
          }),
        textConfigHorizontal: jest
          .fn()
          .mockImplementation((value: QsRadialTextConfig) => {
            store.radialArcTextConfigHorizontal = value
          }),
        textConfigSpoke: jest
          .fn()
          .mockImplementation((value: QsRadialTextConfig) => {
            store.radialArcTextConfigSpoke = value
          }),
        textConfigFollow: jest
          .fn()
          .mockImplementation((value: QsRadialTextConfig) => {
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
      },
    },
  }
}
