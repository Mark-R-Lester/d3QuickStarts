import { legend } from '../../unbound/legend/legend'
import {
  QsLegend,
  QsLegendConfig,
  QsLegendData,
} from '../../unbound/legend/qsTypes'
import {
  QsRadial,
  QsArcConfig,
  QsArcData,
  QsArcSegmentData,
  QsArcEnvelopeData,
  QsArcSegmentConfig,
  QsArcEnvelopeConfig,
} from '../../radialArc/radialArc/qsTypes'
import { arc, envelope, segment } from '../../radialArc/radialArc/radialArc'
import {
  QsRadialArcText,
  QsArcTextConfig,
  QsArcTextFollow,
  QsArcTextData,
} from '../../radialArc/radialArcText/qsTypes'
import { ArcText } from '../../radialArc/radialArcText/radialArcText'
import {
  QsCentroidArea,
  QsCentroidAreaConfig,
  QsCentroidAreaData,
} from '../../radialCentroid/radialCentroidArea/qsTypes'
import { radialArea } from '../../radialCentroid/radialCentroidArea/centroidArea'
import {
  QsCentroidAxis,
  QsCentroidAxisConfig,
} from '../../radialCentroid/radialCentroidAxis/qsTypes'
import { radialAxis } from '../../radialCentroid/radialCentroidAxis/centroidAxis'
import {
  QsCentroidLine,
  QsCentroidLineConfig,
  QsCentroidLineData,
} from '../../radialCentroid/radialCentroidLine/qsTypes'
import { centroidLine } from '../../radialCentroid/radialCentroidLine/centroidLine'
import {
  QsCentroidPointData,
  QsCentroidPoints,
  QsCentroidPointsConfig,
} from '../../radialCentroid/radialCentroidPoints/qsTypes'
import { radialPoint } from '../../radialCentroid/radialCentroidPoints/centroidPoints'
import {
  QsCentroidSpokes,
  QsCentroidSpokesConfig,
} from '../../radialCentroid/radialCentroidSpokes/qsTypes'
import { radialSpokes } from '../../radialCentroid/radialCentroidSpokes/centroidSpokes'

import {
  QsUnboundText,
  QsUnboundTextConfig,
  QsUnboundTextData,
} from '../../unbound/text/qsTypes'
import { unboundText } from '../../unbound/text/text'
import {
  QsCentroidText,
  QsCentroidTextConfig,
} from '../../radialCentroid/radialCentroidText/qsTypes'
import { radialText } from '../../radialCentroid/radialCentroidText/centroidText'
import { Canvas } from '../types'

interface UnboundElementFunctions {
  legend: (data: QsLegendData[], customConfig?: QsLegendConfig) => {}
  text: (data: QsUnboundTextData[], customConfig?: QsUnboundTextConfig) => {}
}

interface RadialArcTextElementFunctions {
  follow: (
    data: QsArcTextData[],
    customConfig?: QsArcTextConfig
  ) => QsArcTextFollow
  horizontal: (
    data: QsArcTextData[],
    customConfig?: QsArcTextConfig
  ) => QsRadialArcText
  rotated: (
    data: QsArcTextData[],
    customConfig?: QsArcTextConfig
  ) => QsRadialArcText
  spokes: (
    data: QsArcTextData[],
    customConfig?: QsArcTextConfig
  ) => QsRadialArcText
}

interface RadialArcElementFunctions {
  arc: (data: QsArcData[], customConfig?: QsArcConfig) => QsRadial
  envelope: (
    data: QsArcEnvelopeData[],
    config?: QsArcEnvelopeConfig
  ) => QsRadial
  segment: (data: QsArcSegmentData[], config?: QsArcSegmentConfig) => QsRadial
  text: RadialArcTextElementFunctions
}

interface CentroidElementFunctions {
  area: (
    data: QsCentroidAreaData,
    customConfig?: QsCentroidAreaConfig
  ) => QsCentroidArea
  axis: (customConfig?: QsCentroidAxisConfig) => QsCentroidAxis
  line: (
    data: QsCentroidLineData,
    customConfig?: QsCentroidLineConfig
  ) => QsCentroidLine
  points: (
    data: QsCentroidPointData[],
    customConfig?: QsCentroidPointsConfig
  ) => QsCentroidPoints
  spokes: (customConfig?: QsCentroidSpokesConfig) => QsCentroidSpokes
  text: (
    data: QsArcTextData[],
    customConfig?: QsCentroidTextConfig
  ) => QsCentroidText
}

export interface QsGeneratorRadial {
  radialArc: RadialArcElementFunctions
  centroid: CentroidElementFunctions
  unbound: UnboundElementFunctions
}

export const getGenerators = (canvas: Canvas): QsGeneratorRadial => {
  const { elements } = canvas

  return {
    unbound: {
      legend: (
        data: QsLegendData[],
        customConfig?: QsLegendConfig
      ): QsLegend => {
        const element = legend(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      text: (
        data: QsUnboundTextData[],
        customConfig?: QsUnboundTextConfig
      ): QsUnboundText => {
        const element = unboundText(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
    },
    radialArc: {
      arc: (data: QsArcData[], customConfig?: QsArcConfig): QsRadial => {
        const element = arc(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      envelope: (
        data: QsArcEnvelopeData[],
        customConfig?: QsArcEnvelopeConfig
      ): QsRadial => {
        const element = envelope(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      segment: (
        data: QsArcSegmentData[],
        customConfig?: QsArcSegmentConfig
      ): QsRadial => {
        const element = segment(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      text: {
        follow: (
          data: QsArcTextData[],
          customConfig?: QsArcTextConfig
        ): QsArcTextFollow => {
          const element = ArcText.follow(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        horizontal: (
          data: QsArcTextData[],
          customConfig?: QsArcTextConfig
        ): QsRadialArcText => {
          const element = ArcText.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        rotated: (
          data: QsArcTextData[],
          customConfig?: QsArcTextConfig
        ): QsRadialArcText => {
          const element = ArcText.rotated(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        spokes: (
          data: QsArcTextData[],
          customConfig?: QsArcTextConfig
        ): QsRadialArcText => {
          const element = ArcText.spoke(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
      },
    },
    centroid: {
      area: (
        data: QsCentroidAreaData,
        customConfig?: QsCentroidAreaConfig
      ): QsCentroidArea => {
        const element = radialArea.area(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      axis: (customConfig?: QsCentroidAxisConfig): QsCentroidAxis => {
        const element = radialAxis.rings(canvas, customConfig)
        elements.push({ element, data: undefined })
        return element
      },
      line: (
        data: QsCentroidLineData,
        customConfig?: QsCentroidLineConfig
      ): QsCentroidLine => {
        const element = centroidLine.line(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      points: (
        data: QsCentroidPointData[],
        customConfig?: QsCentroidPointsConfig
      ): QsCentroidPoints => {
        const element = radialPoint.points(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      spokes: (customConfig?: QsCentroidSpokesConfig): QsCentroidSpokes => {
        const element = radialSpokes.spokes(canvas, customConfig)
        elements.push({ element, data: undefined })
        return element
      },
      text: (
        data: QsArcTextData[],
        customConfig?: QsCentroidTextConfig
      ): QsCentroidText => {
        const element = radialText.text(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
    },
  }
}
