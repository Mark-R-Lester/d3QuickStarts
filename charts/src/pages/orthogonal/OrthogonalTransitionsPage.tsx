import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/molecules/ChartButtonGrid'

import { EnumOrientation } from '../../common/enums'

import { QsColorScaleData, QsEnumColorScale } from 'd3qs/d3QuickStart'

import { useState } from 'react'
import { OrthogonalBarsTransition } from '../home/OrthogonalBarsTransition'
import { OrthogonalAreaTransition } from './area/OrthogonalAreaTransition'
import { OrthogonalBarGroupTransition } from './barGroup/OrthogonalBarGroupTransition'
import { OrthogonalLineTransition } from './line/OrthogonalLineTransition'
import { OrthogonalPointsTransition } from './points/OrthogonalPointsTransition'
import { OrthogonalTextTransition } from './text/OrthogonalTextTransition'

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
  range: ['lightblue', 'darkblue'],
  type: QsEnumColorScale.ORDINAL,
}

const colorScaleSequential: QsColorScaleData = {
  domain: [1, 50],
  range: ['orange', 'red'],
  type: QsEnumColorScale.SEQUENTIAL,
}

export default function OrthogonalTransitionsPage() {
  const menuElements: JSX.Element[] = [
    <OrthogonalBarsTransition
      canvasConfig={{
        chartName: 'verticalBarTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,

    <OrthogonalLineTransition
      canvasConfig={{
        chartName: 'verticalLineTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
    <OrthogonalPointsTransition
      canvasConfig={{
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
    <OrthogonalTextTransition
      canvasConfig={{
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
    <OrthogonalBarsTransition
      canvasConfig={{
        chartName: 'horizontalBarTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <OrthogonalLineTransition
      canvasConfig={{
        chartName: 'horizontalLineTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <OrthogonalPointsTransition
      canvasConfig={{
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
    <OrthogonalTextTransition
      canvasConfig={{
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

    <OrthogonalAreaTransition
      canvasConfig={{
        chartName: 'AreaTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 100,
      }}
    />,
    <OrthogonalBarGroupTransition
      canvasConfig={{
        chartName: 'BarGroupTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <OrthogonalBarsTransition
      canvasConfig={{
        chartName: 'verticalBarTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,

    <OrthogonalLineTransition
      canvasConfig={{
        chartName: 'verticalLineTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
    <OrthogonalPointsTransition
      canvasConfig={{
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
    <OrthogonalTextTransition
      canvasConfig={{
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
    <OrthogonalBarsTransition
      canvasConfig={{
        chartName: 'horizontalBarTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <OrthogonalLineTransition
      canvasConfig={{
        chartName: 'horizontalLineTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <OrthogonalPointsTransition
      canvasConfig={{
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
    <OrthogonalTextTransition
      canvasConfig={{
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

    <OrthogonalAreaTransition
      canvasConfig={{
        chartName: 'AreaTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 100,
      }}
    />,
    <OrthogonalBarGroupTransition
      canvasConfig={{
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
        orthogonal Transitions
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
