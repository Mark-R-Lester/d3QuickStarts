import { FunctionComponent, useEffect } from 'react'
import {
  QsBarData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsEnumColorScale,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../common/enums'
import { OrienetedChartProps } from '../../../common/chartProps'

export const SimpleBarChart: FunctionComponent<OrienetedChartProps> = ({
  canvasProps,
  orientation,
}) => {
  useEffect(() => {
    const createChart = () => {
      const isVertical = orientation === EnumOrientation.VERTICAL
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

      const data: QsBarData[] = [
        { upperBoundry: 35, lowerBoundry: 5 },
        { upperBoundry: 35, lowerBoundry: 10 },
        { upperBoundry: 30, lowerBoundry: 15 },
        { upperBoundry: 25 },
        { upperBoundry: 20 },
        { upperBoundry: 15 },
        { upperBoundry: 10 },
        { upperBoundry: 5 },
      ]

      if (isVertical) {
        canvas.generate.orthogonal.vertical.bars(data, {
          fillColorScaleData: {
            range: ['red', 'darkblue', 'green'],
            type: QsEnumColorScale.ORDINAL,
          },
        })
        canvas.generate.orthogonal.horizontal.axis.bottom([])
        canvas.generate.orthogonal.vertical.axis.left(
          [1, 2, 3, 4, 5, 6, 7, 8],
          {
            domainScale: QsEnumAxisScaleType.BANDED,
          }
        )
      } else {
        canvas.generate.orthogonal.horizontal.bars(data)
        canvas.generate.orthogonal.vertical.axis.left([])
        canvas.generate.orthogonal.horizontal.axis.bottom(
          [1, 2, 3, 4, 5, 6, 7, 8],
          { domainScale: QsEnumAxisScaleType.BANDED }
        )
      }
    }
    createChart()
  }, [canvasProps, orientation])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
