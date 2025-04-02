import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { LinearBarsFloatingTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsFloatingTransition'
import { LinearBarsTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsTransition'
import { EnumOrientation } from '../../common/enums'
import { LinearLineTransition } from '../../components/atoms/chart/linear/transitions/LinearLineTransition'
import { LinearPointsTransition } from '../../components/atoms/chart/linear/transitions/LinearPointsTransition'
import { LinearAreaTransition } from '../../components/atoms/chart/linear/transitions/LinearAreaTransition'
import { LinearBarGroupTransition } from '../../components/atoms/chart/linear/transitions/LineaBarGroupTransition'
import { QsColorScaleData, QsEnumColorScale } from 'd3qs/d3QuickStart'
import { LinearTextTransition } from '../../components/atoms/chart/linear/transitions/LinearTextTransition'

const pointData = [
  { value: 25, fillColor: 'red' },
  { value: 10 },
  { value: 35 },
  { value: 25 },
  { value: 35 },
  { value: 5 },
  { value: 25 },
  { value: 25 },
]

const colorScaleOrdinal: QsColorScaleData = {
  domain: [1, 100],
  range: ['lightblue', 'darkblue'],
  type: QsEnumColorScale.ORDINAL,
}

const colorScaleSequential: QsColorScaleData = {
  domain: [1, 50],
  range: ['orange', 'red'],
  type: QsEnumColorScale.SEQUENTIAL,
}

export default function LinearTransitionsPage() {
  const elements: JSX.Element[] = [
    <LinearBarsTransition
      canvasProps={{
        chartName: 'verticalBarTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearBarsFloatingTransition
      canvasProps={{
        chartName: 'verticalBarFloatingTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearLineTransition
      canvasProps={{
        chartName: 'verticalLineTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearPointsTransition
      canvasProps={{
        chartName: 'verticalPointsTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      data={pointData}
      orientation={EnumOrientation.VERTICAL}
      config={{
        defaultRadius: 3,
        fillColorScaleData: colorScaleOrdinal,
      }}
    />,
    <LinearTextTransition
      canvasProps={{
        chartName: 'verticalTextTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      data={pointData}
      orientation={EnumOrientation.VERTICAL}
      config={{
        defaultRadius: 3,
        fillColorScaleData: colorScaleOrdinal,
      }}
    />,
    <LinearBarsTransition
      canvasProps={{
        chartName: 'horizontalBarTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearBarsFloatingTransition
      canvasProps={{
        chartName: 'horizontalBarFloatingTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearLineTransition
      canvasProps={{
        chartName: 'horizontalLineTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearPointsTransition
      canvasProps={{
        chartName: 'horizontalPointsTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      data={pointData}
      orientation={EnumOrientation.HORIZONTAL}
      config={{
        defaultRadius: 3,
        fillColorScaleData: colorScaleSequential,
      }}
    />,
    <LinearTextTransition
      canvasProps={{
        chartName: 'horizontalTextTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      data={pointData}
      orientation={EnumOrientation.HORIZONTAL}
      config={{
        defaultRadius: 3,
        fillColorScaleData: colorScaleOrdinal,
      }}
    />,

    <LinearAreaTransition
      canvasProps={{
        chartName: 'AreaTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 100,
      }}
    />,
    <LinearBarGroupTransition
      canvasProps={{
        chartName: 'BarGroupTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Transitions
      </Typography>
      {/* <ChartButtonGrid elements={elements}></ChartButtonGrid> */}
    </>
  )
}
