import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/molecules/ChartButtonGrid'

import {
  QsColorScaleData,
  QsRadialPointData,
  QsEnumColorScale,
} from 'd3qs/d3QuickStart'
import { RadialAreaTransition } from './area/RadialAreaTransition'
import { RadialLineTransition } from './line/RadialLineTransition'
import { RadialPointTransition } from './points/RadialPointsTransition'

export default function RadialTransitionsPage() {
  const radialPointsColouredData: QsRadialPointData[] = [
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
  ]

  const radialPointsData: QsRadialPointData[] = [
    { value: 1, fillColor: 'red' },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
  ]

  const colorScaleOrdinal: QsColorScaleData = {
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.ORDINAL,
  }

  const colorScaleSequentialPoints: QsColorScaleData = {
    domain: [1, 2],
    range: ['green', 'orange'],
    type: QsEnumColorScale.SEQUENTIAL,
  }

  const menuElements: JSX.Element[] = [
    <RadialAreaTransition
      canvasConfig={{
        chartName: 'radialAreaTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 100,
      }}
    />,
    <RadialLineTransition
      canvasConfig={{
        chartName: 'radialLineTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
    <RadialPointTransition
      canvasConfig={{
        chartName: 'radialPointsTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 2.5,
      }}
      data={radialPointsColouredData}
    />,
    <RadialPointTransition
      canvasConfig={{
        chartName: 'radialPointsOridinalTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 2.5,
      }}
      data={radialPointsData}
      config={{
        fillColorScaleData: colorScaleOrdinal,
      }}
    />,
    <RadialPointTransition
      canvasConfig={{
        chartName: 'radialPointsSerialTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 2.5,
      }}
      data={radialPointsData}
      config={{
        fillColorScaleData: colorScaleSequentialPoints,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <RadialAreaTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 100,
      }}
    />,
    <RadialLineTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
    <RadialPointTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 2.5,
      }}
      data={radialPointsColouredData}
    />,
    <RadialPointTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 2.5,
      }}
      data={radialPointsData}
      config={{
        fillColorScaleData: colorScaleOrdinal,
      }}
    />,
    <RadialPointTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 2.5,
      }}
      data={radialPointsData}
      config={{
        fillColorScaleData: colorScaleSequentialPoints,
      }}
    />,
  ]

  const [chart, setChart] = useState<JSX.Element>(charts[0])
  const onClick = (index: number) => {
    setChart(charts[index])
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Centroid Transitions
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
function useState<T>(arg0: JSX.Element): [any, any] {
  throw new Error('Function not implemented.')
}
