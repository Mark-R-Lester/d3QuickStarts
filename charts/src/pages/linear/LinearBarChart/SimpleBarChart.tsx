import { QsBarData } from 'd3qs/d3QuickStart'
import { LinearBarsElement } from '../../../components/atoms/chart/linear/elements/LinearBarsElement'
import { EnumOrientation } from '../../../common/enums'

export const barDataSimple: QsBarData[] = [
  { upperBoundry: 25, lowerBoundry: 5 },
  { upperBoundry: 5 },
  { upperBoundry: 35 },
  { upperBoundry: 25 },
  { upperBoundry: 30 },
  { upperBoundry: 5 },
  { upperBoundry: 25 },
  { upperBoundry: 25 },
]

export const barDataAsString: string = `const barDataSimple: QsBarData[] =[
  { upperBoundry: 25 },
  { upperBoundry: 10 },
  { upperBoundry: 35 },
  { upperBoundry: 25 },
  { upperBoundry: 30 },
  { upperBoundry: 5 },
  { upperBoundry: 25 },
  { upperBoundry: 25 },
]`

export const barCodeAsString: string = `const canvas: QsCanvas = qsCreateCanvas(canvasProps)
canvas.generate.linear.vertical.bars(data)`

export const simpleBarChartSmall = (
  <LinearBarsElement
    canvasProps={{
      chartName: 'linearHorizontalBarsMenu',
      width: 130,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    }}
    orientation={EnumOrientation.HORIZONTAL}
    data={barDataSimple}
  />
)
export const simpleBarChartSmallVertical = (
  <LinearBarsElement
    canvasProps={{
      chartName: 'linearVerticalBarsMenu',
      width: 130,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    }}
    orientation={EnumOrientation.VERTICAL}
    data={barDataSimple}
  />
)
export const simpleBarChartLarge = (
  <LinearBarsElement
    canvasProps={{
      chartName: 'bars',
      width: 800,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    }}
    orientation={EnumOrientation.HORIZONTAL}
    data={barDataSimple}
  />
)

export const simpleBarChartLargeVertical = (
  <LinearBarsElement
    canvasProps={{
      chartName: 'bars',
      width: 800,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    }}
    orientation={EnumOrientation.VERTICAL}
    data={barDataSimple}
  />
)
