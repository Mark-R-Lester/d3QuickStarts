import { legend } from '../../unbound/legend/legend'
import {
  QsLegend,
  QsLegendConfig,
  QsLegendData,
} from '../../unbound/legend/qsTypes'
import {
  QsRadial,
  QsRadialArcConfig,
  QsRadialData,
} from '../../radialArc/radialArc/qsTypes'
import { radialArc } from '../../radialArc/radialArc/radialArc'
import {
  QsRadialArcText,
  QsRadialArcTextConfig,
  QsRadialArcTextFollow,
  QsRadialTextData,
} from '../../radialArc/radialArcText/qsTypes'
import { radialArcText } from '../../radialArc/radialArcText/radialArcText'
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
    data: QsRadialTextData[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcTextFollow
  horizontal: (
    data: QsRadialTextData[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcText
  rotated: (
    data: QsRadialTextData[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcText
  spokes: (
    data: QsRadialTextData[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcText
}

interface RadialArcElementFunctions {
  radial: (data: QsRadialData[], customConfig?: QsRadialArcConfig) => QsRadial
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
    data: QsRadialTextData[],
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
      radial: (
        data: QsRadialData[],
        customConfig?: QsRadialArcConfig
      ): QsRadial => {
        const element = radialArc.radial(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      text: {
        follow: (
          data: QsRadialTextData[],
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcTextFollow => {
          const element = radialArcText.follow(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        horizontal: (
          data: QsRadialTextData[],
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcText => {
          const element = radialArcText.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        rotated: (
          data: QsRadialTextData[],
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcText => {
          const element = radialArcText.rotated(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        spokes: (
          data: QsRadialTextData[],
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcText => {
          const element = radialArcText.spoke(canvas, data, customConfig)
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
        data: QsRadialTextData[],
        customConfig?: QsCentroidTextConfig
      ): QsCentroidText => {
        const element = radialText.text(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
    },
  }
}
