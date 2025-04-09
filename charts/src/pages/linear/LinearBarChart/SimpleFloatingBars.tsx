import { QsBarData, QsEnumColorScale } from 'd3qs/d3QuickStart'
import { LinearBarsElement } from '../../../components/atoms/chart/linear/elements/LinearBarsElement'
import { EnumOrientation } from '../../../common/enums'

export const barDataWithColors: QsBarData[] = [
  { upperBoundry: 25, fillColor: 'red' },
  { upperBoundry: 10, fillColor: 'blue' },
  { upperBoundry: 35, fillColor: 'green' },
  { upperBoundry: 25, fillColor: 'purple' },
  { upperBoundry: 35, fillColor: 'black' },
  { upperBoundry: 5, fillColor: 'yellow' },
  { upperBoundry: 25, fillColor: 'orange' },
  { upperBoundry: 25, fillColor: 'pink' },
]

export const barDataFloating: QsBarData[] = [
  { lowerBoundry: 0, upperBoundry: 5 },
  { lowerBoundry: 5, upperBoundry: 10 },
  { lowerBoundry: 25, upperBoundry: 35 },
  { lowerBoundry: 10, upperBoundry: 20 },
  { lowerBoundry: 15, upperBoundry: 25 },
]

export const configOrdinalColors = {
  defaultStrokeWidth: 1,
  defaultStrokeColor: 'orange',
  fillColorScaleData: {
    range: ['green', 'orange', 'red'],
    domain: [1, 70],
    type: QsEnumColorScale.ORDINAL,
  },
}

export const configSquentialColors = {
  fillColorScaleData: {
    range: ['lightblue', 'steelblue', 'blue'],
    domain: [1, 70],
    type: QsEnumColorScale.SEQUENTIAL,
  },
}

export const floatingBarChartSmall = (
  <LinearBarsElement
    canvasProps={{
      chartName: 'linearHorizontalBarsFloatingMenu',
      width: 130,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    }}
    orientation={EnumOrientation.HORIZONTAL}
    data={barDataFloating}
    config={configOrdinalColors}
  />
)
export const floatingBarChartSmallVertical = (
  <LinearBarsElement
    canvasProps={{
      chartName: 'linearVerticalBarsFloatingMenu',
      width: 130,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    }}
    orientation={EnumOrientation.VERTICAL}
    data={barDataFloating}
    config={configSquentialColors}
  />
)

export const floatingBarChartLarge = (
  <LinearBarsElement
    canvasProps={{
      chartName: 'bars',
      width: 800,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    }}
    orientation={EnumOrientation.HORIZONTAL}
    data={barDataFloating}
    config={configOrdinalColors}
  />
)
export const floatingBarChartLargeVertical = (
  <LinearBarsElement
    canvasProps={{
      chartName: 'bars',
      width: 800,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    }}
    orientation={EnumOrientation.VERTICAL}
    data={barDataFloating}
    config={configSquentialColors}
  />
)
