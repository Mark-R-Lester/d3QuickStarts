import { QsLegendConfig } from '../../unbound/legend/qsTypes'
import { QsAreaConfig } from '../../orthogonal/orthogonalArea/qsTypes'
import { QsAxisConfig } from '../../orthogonal/orthogonalAxis/qsTypes'
import { QsBarConfig } from '../../orthogonal/orthogonalBar/qsTypes'
import { QsBarGroupConfig } from '../../orthogonal/orthogonalBarGroup/qsTypes'
import { QsBarStackedConfig } from '../../orthogonal/orthogonalBarStack/qsTypes'
import { QsLineConfig } from '../../orthogonal/orthogonalLine/qsTypes'
import { QsPointsConfig } from '../../orthogonal/orthogonalPoints/qsTypes'
import { QsTextConfig } from '../../orthogonal/orthogonalText/qsTypes'
import { QsPlottedLineConfig } from '../../plots/plottedLine/qsTypes'
import { QsPlottedPointsConfig } from '../../plots/plottedPoints/qsTypes'
import { QsPlottedTextConfig } from '../../plots/plottedText/qsTypes'
import {
  QsArcEnvelopeConfig,
  QsArcSegmentConfig,
  QsArcSliceConfig,
} from '../../radialArc/radialArc/qsTypes'
import { QsArcTextConfig } from '../../radialArc/radialArcText/qsTypes'
import { QsCentroidAreaConfig } from '../../radialCentroid/radialCentroidArea/qsTypes'
import { QsCentroidAxisConfig } from '../../radialCentroid/radialCentroidAxis/qsTypes'
import { QsCentroidLineConfig } from '../../radialCentroid/radialCentroidLine/qsTypes'
import { QsCentroidPointsConfig } from '../../radialCentroid/radialCentroidPoints/qsTypes'
import { QsCentroidSpokesConfig } from '../../radialCentroid/radialCentroidSpokes/qsTypes'
import { QsCentroidTextConfig } from '../../radialCentroid/radialCentroidText/qsTypes'
import { QsUnboundText, QsUnboundTextConfig } from '../../d3QuickStart'

export interface ConfigStore {
  legendConfig?: QsLegendConfig
  unboundTextConfig?: QsUnboundTextConfig
  orthogonalAreaConfig?: QsAreaConfig
  orthogonalAxisConfigTop?: QsAxisConfig
  orthogonalAxisConfigBottom?: QsAxisConfig
  orthogonalAxisConfigLeft?: QsAxisConfig
  orthogonalAxisConfigRight?: QsAxisConfig
  orthogonalBarConfig?: QsBarConfig
  orthogonalBarGroupConfig?: QsBarGroupConfig
  orthogonalBarStackConfig?: QsBarStackedConfig
  orthogonalLineConfig?: QsLineConfig
  orthogonalPointsConfig?: QsPointsConfig
  orthogonalTextConfig?: QsTextConfig
  plottedLineConfig?: QsPlottedLineConfig
  plottedPointsConfig?: QsPlottedPointsConfig
  plottedTextConfig?: QsPlottedTextConfig
  arcSliceConfig?: QsArcSliceConfig
  arcSegmentConfig?: QsArcSegmentConfig
  arcEnvelopeConfig?: QsArcEnvelopeConfig
  arcTextConfigRotated?: QsArcTextConfig
  arcTextConfigHorizontal?: QsArcTextConfig
  arcTextConfigSpoke?: QsArcTextConfig
  arcTextConfigFollow?: QsArcTextConfig
  centroidAreaConfig?: QsCentroidAreaConfig
  centroidAxisConfig?: QsCentroidAxisConfig
  centroidLineConfig?: QsCentroidLineConfig
  centroidPointsConfig?: QsCentroidPointsConfig
  centroidSpokesConfig?: QsCentroidSpokesConfig
  centroidTextConfig?: QsCentroidTextConfig
}

export interface ConfigGetters {
  unbound: {
    legendConfig: () => QsLegendConfig | undefined
    textConfig: () => QsUnboundTextConfig | undefined
  }
  orthogonal: {
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
  arc: {
    arcSliceConfig: () => QsArcSliceConfig | undefined
    arcSegmentConfig: () => QsArcSliceConfig | undefined
    arcEnvelopeConfig: () => QsArcSliceConfig | undefined
    textConfigRotated: () => QsArcTextConfig | undefined
    textConfigHorizontal: () => QsArcTextConfig | undefined
    textConfigSpoke: () => QsArcTextConfig | undefined
    textConfigFollow: () => QsArcTextConfig | undefined
  }
  centroid: {
    areaConfig: () => QsCentroidAreaConfig | undefined
    axisConfig: () => QsCentroidAxisConfig | undefined
    lineConfig: () => QsCentroidLineConfig | undefined
    pointsConfig: () => QsCentroidPointsConfig | undefined
    spokesConfig: () => QsCentroidSpokesConfig | undefined
    textConfig: () => QsCentroidTextConfig | undefined
  }
}

export interface ConfigSetters {
  unbound: {
    legendConfig: (value: QsLegendConfig) => void
    textConfig: (value: QsUnboundTextConfig) => void
  }
  orthogonal: {
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
  arc: {
    arcSliceConfig: (value: QsArcSliceConfig) => void
    arcSegmentConfig: (value: QsArcSegmentConfig) => void
    arcEnvelopeConfig: (value: QsArcEnvelopeConfig) => void
    textConfigRotated: (value: QsArcTextConfig) => void
    textConfigHorizontal: (value: QsArcTextConfig) => void
    textConfigSpoke: (value: QsArcTextConfig) => void
    textConfigFollow: (value: QsArcTextConfig) => void
  }
  centroid: {
    areaConfig: (value: QsCentroidAreaConfig) => void
    axisConfig: (value: QsCentroidAxisConfig) => void
    lineConfig: (value: QsCentroidLineConfig) => void
    pointsConfig: (value: QsCentroidPointsConfig) => void
    spokesConfig: (value: QsCentroidSpokesConfig) => void
    textConfig: (value: QsCentroidTextConfig) => void
  }
}

export class ConfigStoreManager {
  private store: ConfigStore

  constructor() {
    this.store = {
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
  }

  public get getters(): ConfigGetters {
    return {
      unbound: {
        legendConfig: () => this.store.legendConfig,
        textConfig: () => this.store.unboundTextConfig,
      },
      orthogonal: {
        areaConfig: () => this.store.orthogonalAreaConfig,
        axisConfigTop: () => this.store.orthogonalAxisConfigTop,
        axisConfigBottom: () => this.store.orthogonalAxisConfigBottom,
        axisConfigLeft: () => this.store.orthogonalAxisConfigLeft,
        axisConfigRight: () => this.store.orthogonalAxisConfigRight,
        barConfig: () => this.store.orthogonalBarConfig,
        barGroupConfig: () => this.store.orthogonalBarGroupConfig,
        barStackConfig: () => this.store.orthogonalBarStackConfig,
        lineConfig: () => this.store.orthogonalLineConfig,
        pointsConfig: () => this.store.orthogonalPointsConfig,
        textConfig: () => this.store.orthogonalTextConfig,
      },
      plotted: {
        lineConfig: () => this.store.plottedLineConfig,
        pointsConfig: () => this.store.plottedPointsConfig,
        textConfig: () => this.store.plottedTextConfig,
      },
      arc: {
        arcSliceConfig: () => this.store.arcSliceConfig,
        arcSegmentConfig: () => this.store.arcSegmentConfig,
        arcEnvelopeConfig: () => this.store.arcEnvelopeConfig,
        textConfigRotated: () => this.store.arcTextConfigRotated,
        textConfigHorizontal: () => this.store.arcTextConfigHorizontal,
        textConfigSpoke: () => this.store.arcTextConfigSpoke,
        textConfigFollow: () => this.store.arcTextConfigFollow,
      },
      centroid: {
        areaConfig: () => this.store.centroidAreaConfig,
        axisConfig: () => this.store.centroidAxisConfig,
        lineConfig: () => this.store.centroidLineConfig,
        pointsConfig: () => this.store.centroidPointsConfig,
        spokesConfig: () => this.store.centroidSpokesConfig,
        textConfig: () => this.store.centroidTextConfig,
      },
    }
  }

  public get setters(): ConfigSetters {
    return {
      unbound: {
        legendConfig: (value: QsLegendConfig) => {
          this.store.legendConfig = value
        },
        textConfig: (value: QsUnboundTextConfig) => {
          this.store.unboundTextConfig = value
        },
      },
      orthogonal: {
        areaConfig: (value: QsAreaConfig) => {
          this.store.orthogonalAreaConfig = value
        },
        axisConfigTop: (value: QsAxisConfig) => {
          this.store.orthogonalAxisConfigTop = value
        },
        axisConfigBottom: (value: QsAxisConfig) => {
          this.store.orthogonalAxisConfigBottom = value
        },
        axisConfigLeft: (value: QsAxisConfig) => {
          this.store.orthogonalAxisConfigLeft = value
        },
        axisConfigRight: (value: QsAxisConfig) => {
          this.store.orthogonalAxisConfigRight = value
        },
        barConfig: (value: QsBarConfig) => {
          this.store.orthogonalBarConfig = value
        },
        barGroupConfig: (value: QsBarGroupConfig) => {
          this.store.orthogonalBarGroupConfig = value
        },
        barStackConfig: (value: QsBarStackedConfig) => {
          this.store.orthogonalBarStackConfig = value
        },
        lineConfig: (value: QsLineConfig) => {
          this.store.orthogonalLineConfig = value
        },
        pointsConfig: (value: QsPointsConfig) => {
          this.store.orthogonalPointsConfig = value
        },
        textConfig: (value: QsTextConfig) => {
          this.store.orthogonalTextConfig = value
        },
      },
      plotted: {
        lineConfig: (value: QsPlottedLineConfig) => {
          this.store.plottedLineConfig = value
        },
        pointsConfig: (value: QsPlottedPointsConfig) => {
          this.store.plottedPointsConfig = value
        },
        textConfig: (value: QsPlottedTextConfig) => {
          this.store.plottedTextConfig = value
        },
      },
      arc: {
        arcSliceConfig: (value: QsArcSliceConfig) => {
          this.store.arcSliceConfig = value
        },
        arcSegmentConfig: (value: QsArcSegmentConfig) => {
          this.store.arcSegmentConfig = value
        },
        arcEnvelopeConfig: (value: QsArcEnvelopeConfig) => {
          this.store.arcEnvelopeConfig = value
        },
        textConfigRotated: (value: QsArcTextConfig) => {
          this.store.arcTextConfigRotated = value
        },
        textConfigHorizontal: (value: QsArcTextConfig) => {
          this.store.arcTextConfigHorizontal = value
        },
        textConfigSpoke: (value: QsArcTextConfig) => {
          this.store.arcTextConfigSpoke = value
        },
        textConfigFollow: (value: QsArcTextConfig) => {
          this.store.arcTextConfigFollow = value
        },
      },
      centroid: {
        areaConfig: (value: QsCentroidAreaConfig) => {
          this.store.centroidAreaConfig = value
        },
        axisConfig: (value: QsCentroidAxisConfig) => {
          this.store.centroidAxisConfig = value
        },
        lineConfig: (value: QsCentroidLineConfig) => {
          this.store.centroidLineConfig = value
        },
        pointsConfig: (value: QsCentroidPointsConfig) => {
          this.store.centroidPointsConfig = value
        },
        spokesConfig: (value: QsCentroidSpokesConfig) => {
          this.store.centroidSpokesConfig = value
        },
        textConfig: (value: QsCentroidTextConfig) => {
          this.store.centroidTextConfig = value
        },
      },
    }
  }
}
