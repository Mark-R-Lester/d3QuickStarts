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
  QsValuedText,
} from '../../radialArc/radialArcText/qsTypes'
import { radialArcText } from '../../radialArc/radialArcText/radialArcText'
import {
  QsRadialArea,
  QsRadialAreaConfig,
  QsRadialAreaData,
} from '../../radialCentroid/radialCentroidArea/qsTypes'
import { radialArea } from '../../radialCentroid/radialCentroidArea/radialCentroidArea'
import {
  QsRadialAxis,
  QsRadialAxisConfig,
} from '../../radialCentroid/radialCentroidAxis/qsTypes'
import { radialAxis } from '../../radialCentroid/radialCentroidAxis/radialCentroidAxis'
import {
  QsRadialLine,
  QsRadialLineConfig,
  QsRadialLineData,
} from '../../radialCentroid/radialCentroidLine/qsTypes'
import { radialLine } from '../../radialCentroid/radialCentroidLine/radialCentroidLine'
import {
  QsRadialPointData,
  QsRadialPoints,
  QsRadialPointsConfig,
} from '../../radialCentroid/radialCentroidPoints/qsTypes'
import { radialPoint } from '../../radialCentroid/radialCentroidPoints/radialCentroidPoints'
import {
  QsRadialSpokes,
  QsRadialSpokesConfig,
} from '../../radialCentroid/radialCentroidSpokes/qsTypes'
import { radialSpokes } from '../../radialCentroid/radialCentroidSpokes/radialCentroidSpokes'

import {
  QsUnboundText,
  QsUnboundTextConfig,
  QsUnboundTextData,
} from '../../unbound/text/qsTypes'
import { unboundText } from '../../unbound/text/text'
import {
  QsRadialText,
  QsRadialTextConfig,
  QsRadialTextData,
} from '../../radialCentroid/radialCentroidText/qsTypes'
import { radialText } from '../../radialCentroid/radialCentroidText/radialCentroidText'
import { Canvas } from '../types'

interface UnboundElementFunctions {
  legend: (data: QsLegendData[], customConfig?: QsLegendConfig) => {}
  text: (data: QsUnboundTextData[], customConfig?: QsUnboundTextConfig) => {}
}

interface RadialArcTextElementFunctions {
  follow: (
    data: QsValuedText[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcText
  horizontal: (
    data: QsValuedText[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcText
  rotated: (
    data: QsValuedText[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcText
  spoke: (
    data: QsValuedText[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcText
}

interface RadialArcElementFunctions {
  radial: (data: QsRadialData[], customConfig?: QsRadialArcConfig) => QsRadial
  text: RadialArcTextElementFunctions
}

interface RadialCentroidElementFunctions {
  area: (
    data: QsRadialAreaData,
    customConfig?: QsRadialAreaConfig
  ) => QsRadialArea
  axis: (data: number[], customConfig?: QsRadialAxisConfig) => QsRadialAxis
  line: (
    data: QsRadialLineData,
    customConfig?: QsRadialLineConfig
  ) => QsRadialLine
  points: (
    data: QsRadialPointData[],
    customConfig?: QsRadialPointsConfig
  ) => QsRadialPoints
  spokes: (data: number, customConfig?: QsRadialSpokesConfig) => QsRadialSpokes
  text: (
    data: QsRadialTextData[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
}

export interface QsGeneratorRadial {
  radialArc: RadialArcElementFunctions
  radialCentroid: RadialCentroidElementFunctions
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
          data: QsValuedText[],
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcText => {
          const element = radialArcText.follow(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        horizontal: (
          data: QsValuedText[],
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcText => {
          const element = radialArcText.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        rotated: (
          data: QsValuedText[],
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcText => {
          const element = radialArcText.rotated(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        spoke: (
          data: QsValuedText[],
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcText => {
          const element = radialArcText.spoke(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
      },
    },
    radialCentroid: {
      area: (
        data: QsRadialAreaData,
        customConfig?: QsRadialAreaConfig
      ): QsRadialArea => {
        const element = radialArea.area(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      axis: (
        data: number[],
        customConfig?: QsRadialAxisConfig
      ): QsRadialAxis => {
        const element = radialAxis.rings(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      line: (
        data: QsRadialLineData,
        customConfig?: QsRadialLineConfig
      ): QsRadialLine => {
        const element = radialLine.line(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      points: (
        data: QsRadialPointData[],
        customConfig?: QsRadialPointsConfig
      ): QsRadialPoints => {
        const element = radialPoint.points(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      spokes: (
        data: number,
        customConfig?: QsRadialSpokesConfig
      ): QsRadialSpokes => {
        const element = radialSpokes.spokes(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      text: (
        data: QsRadialTextData[],
        customConfig?: QsRadialTextConfig
      ): QsRadialText => {
        const element = radialText.text(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
    },
  }
}
