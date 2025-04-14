import { QsBarData } from 'd3qs/d3QuickStart'
import { LinearBarsElement } from '../../../components/atoms/chart/linear/LinearBars'
import { EnumOrientation } from '../../../common/enums'

export const barDataSimple: QsBarData[] = [
  { upperBoundry: 35, lowerBoundry: 5 },
  { upperBoundry: 35, lowerBoundry: 10 },
  { upperBoundry: 30, lowerBoundry: 15 },
  { upperBoundry: 25 },
  { upperBoundry: 20 },
  { upperBoundry: 15 },
  { upperBoundry: 10 },
  { upperBoundry: 5 },
]

export const barDataAsString: string = `const barDataSimple: QsBarData[] =[
  { upperBoundry: 35, lowerBoundry: 5 },
  { upperBoundry: 35, lowerBoundry: 10 },
  { upperBoundry: 30, lowerBoundry: 15 },
  { upperBoundry: 25 },
  { upperBoundry: 20 },
  { upperBoundry: 15 },
  { upperBoundry: 10 },
  { upperBoundry: 5 },
]`

export const barsVerticalAsString: string = `const canvas: QsCanvas = qsCreateCanvas(canvasProps)
  canvas.generate.linear.vertical.bars(data, config)
  canvas.generate.linear.horizontal.axis.bottom([0, 35])
  canvas.generate.linear.vertical.axis.leftBanded([
    1, 2, 3, 4, 5, 6, 7, 8,
  ])`

export const barsHorizontalAsString: string = `const canvas: QsCanvas = qsCreateCanvas(canvasProps)
  canvas.generate.linear.horizontal.bars(data, config)
  canvas.generate.linear.vertical.axis.left([0, 35])
  canvas.generate.linear.horizontal.axis.bottomBanded([
    1, 2, 3, 4, 5, 6, 7, 8,
  ])`

export const simpleBarChartHorizontal = (chartName: string, width: number) => (
  <LinearBarsElement
    canvasProps={{
      chartName,
      width,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    }}
    orientation={EnumOrientation.HORIZONTAL}
    data={barDataSimple}
  />
)

export const simpleBarChartVertical = (chartName: string, width: number) => (
  <LinearBarsElement
    canvasProps={{
      chartName,
      width,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    }}
    orientation={EnumOrientation.VERTICAL}
    data={barDataSimple}
  />
)
