import { Box, Typography } from '@mui/material'

import {
  QsColorScaleData,
  QsRadialData,
  QsValuedText,
  QsEnumColorScale,
} from 'd3qs/d3QuickStart'
import { EnumRadialTextOrientation } from '../../common/enums'
import { RadialTransition } from './arc/RadialTransition'
import { useState } from 'react'
import { RadialTextTransition } from './arcText/RadialTextTransition'
import { ChartButtonGrid } from '../../components/molecules/ChartButtonGrid'

export default function RadialTransitionsPage() {
  const data1: QsValuedText[] = [{ value: 25 }, { value: 10 }, { value: 15 }]
  const data2: QsValuedText[] = [{ value: 25 }, { value: 10 }, { value: 15 }]
  const data3: QsValuedText[] = [{ value: 25 }, { value: 10 }, { value: 15 }]
  const data4: QsValuedText[] = [{ value: 25 }, { value: 10 }, { value: 15 }]

  const radialData: QsRadialData[] = [
    { value: 25 },
    { value: 10 },
    { value: 15 },
    { value: 30 },
    { value: 25 },
    { value: 10 },
    { value: 15 },
    { value: 30 },
  ]

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
      data={data1}
      orientation={EnumRadialTextOrientation.FOLLOW}
    />,
    <RadialTextTransition
      canvasConfig={{
        chartName: 'radialTextSkokeTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={data2}
      orientation={EnumRadialTextOrientation.SPOKE}
    />,
    <RadialTextTransition
      canvasConfig={{
        chartName: 'radialTextHorizontalTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={data3}
      orientation={EnumRadialTextOrientation.HORIZONTAL}
    />,
    <RadialTextTransition
      canvasConfig={{
        chartName: 'radialTextRotatedTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={data4}
      orientation={EnumRadialTextOrientation.ROTATED}
    />,
    <RadialTransition
      canvasConfig={{
        chartName: 'radialRadialColorTransition',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={radialData}
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
      data={radialData}
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
      data={data1}
      orientation={EnumRadialTextOrientation.FOLLOW}
    />,
    <RadialTextTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={data2}
      orientation={EnumRadialTextOrientation.SPOKE}
    />,
    <RadialTextTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={data3}
      orientation={EnumRadialTextOrientation.HORIZONTAL}
    />,
    <RadialTextTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={data4}
      orientation={EnumRadialTextOrientation.ROTATED}
    />,
    <RadialTransition
      canvasConfig={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={radialData}
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
      data={radialData}
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
