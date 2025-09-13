import { Box, Typography } from '@mui/material'
import { QsColorScaleData, QsEnumColorScale } from 'd3qs/d3QuickStart'
import { RadialTransition } from './slice/RadialTransition'
import { useState } from 'react'
import { RadialTextTransition } from './arcText/RadialTextTransition'
import { ChartButtonGrid } from '../../components/molecules/ChartButtonGrid'

export default function RadialTransitionsPage() {
  const colorScaleOrdinal: QsColorScaleData = {
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.ORDINAL,
  }

  const colorScaleSequential: QsColorScaleData = {
    domain: [1, 100],
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.SEQUENTIAL,
  }

  const menuElements: JSX.Element[] = [
    <RadialTextTransition
      canvasConfig={{
        chartName: 'radialTextFollowTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
    />,

    <RadialTransition
      canvasConfig={{
        chartName: 'radialRadialColorTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      config={{
        innerRadius: 80,
        padding: 0.03,
        fillColorScaleData: colorScaleSequential,
      }}
    />,
    <RadialTransition
      canvasConfig={{
        chartName: 'radialSerialColoeTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      config={{
        innerRadius: 50,
        fillColorScaleData: colorScaleOrdinal,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <RadialTextTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
    />,

    <RadialTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      config={{
        innerRadius: 80,
        padding: 0.03,
        fillColorScaleData: colorScaleSequential,
      }}
    />,
    <RadialTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      config={{
        innerRadius: 50,
        fillColorScaleData: colorScaleOrdinal,
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
        Radial Transitions
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
