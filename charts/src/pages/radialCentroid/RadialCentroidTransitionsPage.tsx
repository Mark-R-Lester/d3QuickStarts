import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { RadialAreaTransition } from '../../components/atoms/chart/radial/transitions/RadialAreaTransition'
import { RadialLineTransition } from '../../components/atoms/chart/radial/transitions/RadialLineTransition'
import { RadialPointTransition } from '../../components/atoms/chart/radial/transitions/RadialPointsTransition'
import {
  QsColorScaleData,
  QsRadialPointData,
  QsEnumColorScale,
} from 'd3qs/d3QuickStart'

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
    domain: [1, 100],
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.ORDINAL,
  }

  const colorScaleSequentialPoints: QsColorScaleData = {
    domain: [1, 2],
    range: ['green', 'orange'],
    type: QsEnumColorScale.SEQUENTIAL,
  }

  const elements: JSX.Element[] = [
    <RadialAreaTransition
      canvasProps={{
        chartName: 'radialAreaTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 100,
      }}
    />,
    <RadialLineTransition
      canvasProps={{
        chartName: 'radialLineTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
    <RadialPointTransition
      canvasProps={{
        chartName: 'radialPointsTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 2.5,
      }}
      data={radialPointsColouredData}
    />,
    <RadialPointTransition
      canvasProps={{
        chartName: 'radialPointsOridinalTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 2.5,
      }}
      data={radialPointsData}
      config={{
        fillColorScaleData: colorScaleOrdinal,
      }}
    />,
    <RadialPointTransition
      canvasProps={{
        chartName: 'radialPointsSerialTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 2.5,
      }}
      data={radialPointsData}
      config={{
        fillColorScaleData: colorScaleSequentialPoints,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Centroid Transitions
      </Typography>
      {/* <ChartButtonGrid elements={elements}></ChartButtonGrid> */}
    </>
  )
}
