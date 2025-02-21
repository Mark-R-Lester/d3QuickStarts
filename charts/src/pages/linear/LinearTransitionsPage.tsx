import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
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
      chartName="verticalBarTransition"
      chartWidth={150}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearBarsFloatingTransition
      chartName="verticalBarFloatingTransition"
      chartWidth={150}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearLineTransition
      chartName="verticalLineTransition"
      chartWidth={150}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearPointsTransition
      chartName="verticalPointsTransition"
      chartWidth={150}
      data={pointData}
      orientation={EnumOrientation.VERTICAL}
      config={{
        defaultRadius: 3,
        fillColorScaleData: colorScaleOrdinal,
      }}
    />,
    <LinearTextTransition
      chartName="verticalTextTransition"
      chartWidth={150}
      data={pointData}
      orientation={EnumOrientation.VERTICAL}
      config={{
        defaultRadius: 3,
        fillColorScaleData: colorScaleOrdinal,
      }}
    />,
    <LinearBarsTransition
      chartName="horizontalBarTransition"
      chartWidth={150}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearBarsFloatingTransition
      chartName="horizontalBarFloatingTransition"
      chartWidth={150}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearLineTransition
      chartName="horizontalLineTransition"
      chartWidth={150}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearPointsTransition
      chartName="horizontalPointsTransition"
      chartWidth={150}
      data={pointData}
      orientation={EnumOrientation.HORIZONTAL}
      config={{
        defaultRadius: 3,
        fillColorScaleData: colorScaleSequential,
      }}
    />,
    <LinearTextTransition
      chartName="horizontalTextTransition"
      chartWidth={150}
      data={pointData}
      orientation={EnumOrientation.HORIZONTAL}
      config={{
        defaultRadius: 3,
        fillColorScaleData: colorScaleOrdinal,
      }}
    />,

    <LinearAreaTransition chartName="AreaTransition" chartWidth={150} />,
    <LinearBarGroupTransition
      chartName="BarGroupTransition"
      chartWidth={150}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Transitions
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
