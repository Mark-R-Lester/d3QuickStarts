import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'

import { EnumOrientation } from '../../common/enums'

import { QsColorScaleData, QsEnumColorScale } from 'd3qs/d3QuickStart'

import { useState } from 'react'
import { LinearBarsTransition } from '../home/LinearBarsTransition'
import { LinearAreaTransition } from './area/LinearAreaTransition'
import { LinearBarGroupTransition } from './barGroup/LineaBarGroupTransition'
import { LinearLineTransition } from './line/LinearLineTransition'
import { LinearPointsTransition } from './points/LinearPointsTransition'
import { LinearTextTransition } from './text/LinearTextTransition'

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
  const menuElements: JSX.Element[] = [
    <LinearBarsTransition
      canvasProps={{
        chartName: 'verticalBarTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,

    <LinearLineTransition
      canvasProps={{
        chartName: 'verticalLineTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearPointsTransition
      canvasProps={{
        chartName: 'verticalPointsTransition',
        width: 130,
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
        width: 130,
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
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearLineTransition
      canvasProps={{
        chartName: 'horizontalLineTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearPointsTransition
      canvasProps={{
        chartName: 'horizontalPointsTransition',
        width: 130,
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
        width: 130,
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
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 100,
      }}
    />,
    <LinearBarGroupTransition
      canvasProps={{
        chartName: 'BarGroupTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <LinearBarsTransition
      canvasProps={{
        chartName: 'verticalBarTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,

    <LinearLineTransition
      canvasProps={{
        chartName: 'verticalLineTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearPointsTransition
      canvasProps={{
        chartName: 'verticalPointsTransition',
        width: 130,
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
        width: 130,
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
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearLineTransition
      canvasProps={{
        chartName: 'horizontalLineTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearPointsTransition
      canvasProps={{
        chartName: 'horizontalPointsTransition',
        width: 130,
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
        width: 130,
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
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 100,
      }}
    />,
    <LinearBarGroupTransition
      canvasProps={{
        chartName: 'BarGroupTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 40,
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
        Linear Transitions
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
