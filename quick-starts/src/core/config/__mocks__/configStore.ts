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
import {
  QsArcEnvelopeConfig,
  QsArcSegmentConfig,
  QsArcSliceConfig,
} from '../../../radialArc/radialArc/qsTypes'
import { QsArcTextConfig } from '../../../radialArc/radialArcText/qsTypes'
import { QsCentroidAreaConfig } from '../../../radialCentroid/radialCentroidArea/qsTypes'
import { QsCentroidAxisConfig } from '../../../radialCentroid/radialCentroidAxis/qsTypes'
import { QsCentroidLineConfig } from '../../../radialCentroid/radialCentroidLine/qsTypes'
import { QsCentroidPointsConfig } from '../../../radialCentroid/radialCentroidPoints/qsTypes'
import { QsCentroidSpokesConfig } from '../../../radialCentroid/radialCentroidSpokes/qsTypes'

import { QsCentroidTextConfig } from '../../../radialCentroid/radialCentroidText/qsTypes'
import { ConfigStore } from '../configStore.class'
import { QsUnboundTextConfig } from '../../../d3QuickStart'

export const createMockConfigStore = () => {
  const store: ConfigStore = {
    legendConfig: undefined,
    unboundTextConfig: undefined,
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
    arcSliceConfig: undefined,
    arcSegmentConfig: undefined,
    arcEnvelopeConfig: undefined,
    arcTextConfigRotated: undefined,
    arcTextConfigHorizontal: undefined,
    arcTextConfigSpoke: undefined,
    arcTextConfigFollow: undefined,
    centroidAreaConfig: undefined,
    centroidAxisConfig: undefined,
    centroidLineConfig: undefined,
    centroidPointsConfig: undefined,
    centroidSpokesConfig: undefined,
    centroidTextConfig: undefined,
  }

  return {
    getters: {
      unbound: {
        legendConfig: jest.fn().mockImplementation(() => store.legendConfig),
        textConfig: jest.fn().mockImplementation(() => store.unboundTextConfig),
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
      arc: {
        arcSliceConfig: jest
          .fn()
          .mockImplementation(() => store.arcSliceConfig),
        arcSegmentConfig: jest
          .fn()
          .mockImplementation(() => store.arcSegmentConfig),
        arcEnvelopeConfig: jest
          .fn()
          .mockImplementation(() => store.arcEnvelopeConfig),
        textConfigRotated: jest
          .fn()
          .mockImplementation(() => store.arcTextConfigRotated),
        textConfigHorizontal: jest
          .fn()
          .mockImplementation(() => store.arcTextConfigHorizontal),
        textConfigSpoke: jest
          .fn()
          .mockImplementation(() => store.arcTextConfigSpoke),
        textConfigFollow: jest
          .fn()
          .mockImplementation(() => store.arcTextConfigFollow),
      },
      centroid: {
        areaConfig: jest
          .fn()
          .mockImplementation(() => store.centroidAreaConfig),
        axisConfig: jest
          .fn()
          .mockImplementation(() => store.centroidAxisConfig),
        lineConfig: jest
          .fn()
          .mockImplementation(() => store.centroidLineConfig),
        pointsConfig: jest
          .fn()
          .mockImplementation(() => store.centroidPointsConfig),
        spokesConfig: jest
          .fn()
          .mockImplementation(() => store.centroidSpokesConfig),
        textConfig: jest
          .fn()
          .mockImplementation(() => store.centroidTextConfig),
      },
    },
    setters: {
      unbound: {
        legendConfig: jest.fn().mockImplementation((value: QsLegendConfig) => {
          store.legendConfig = value
        }),
        textConfig: jest
          .fn()
          .mockImplementation((value: QsUnboundTextConfig) => {
            store.unboundTextConfig = value
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
      arc: {
        arcSliceConfig: jest
          .fn()
          .mockImplementation((value: QsArcSliceConfig) => {
            store.arcSliceConfig = value
          }),
        arcSegmentConfig: jest
          .fn()
          .mockImplementation((value: QsArcSegmentConfig) => {
            store.arcSegmentConfig = value
          }),
        arcEnvelopeConfig: jest
          .fn()
          .mockImplementation((value: QsArcEnvelopeConfig) => {
            store.arcEnvelopeConfig = value
          }),
        textConfigRotated: jest
          .fn()
          .mockImplementation((value: QsArcTextConfig) => {
            store.arcTextConfigRotated = value
          }),
        textConfigHorizontal: jest
          .fn()
          .mockImplementation((value: QsArcTextConfig) => {
            store.arcTextConfigHorizontal = value
          }),
        textConfigSpoke: jest
          .fn()
          .mockImplementation((value: QsArcTextConfig) => {
            store.arcTextConfigSpoke = value
          }),
        textConfigFollow: jest
          .fn()
          .mockImplementation((value: QsArcTextConfig) => {
            store.arcTextConfigFollow = value
          }),
      },
      centroid: {
        areaConfig: jest
          .fn()
          .mockImplementation((value: QsCentroidAreaConfig) => {
            store.centroidAreaConfig = value
          }),
        axisConfig: jest
          .fn()
          .mockImplementation((value: QsCentroidAxisConfig) => {
            store.centroidAxisConfig = value
          }),
        lineConfig: jest
          .fn()
          .mockImplementation((value: QsCentroidLineConfig) => {
            store.centroidLineConfig = value
          }),
        pointsConfig: jest
          .fn()
          .mockImplementation((value: QsCentroidPointsConfig) => {
            store.centroidPointsConfig = value
          }),
        spokesConfig: jest
          .fn()
          .mockImplementation((value: QsCentroidSpokesConfig) => {
            store.centroidSpokesConfig = value
          }),
        textConfig: jest
          .fn()
          .mockImplementation((value: QsCentroidTextConfig) => {
            store.centroidTextConfig = value
          }),
      },
    },
  }
}
