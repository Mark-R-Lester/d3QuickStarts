import { Box, Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { EnumOrientation } from '../../common/enums'
import { LinearBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsElement'

import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentContainer } from './ListContainer'
import { QsBarData, QsEnumColorScale } from 'd3qs/d3QuickStart'

export default function LinearBarsPage() {
  const barDataWithColors: QsBarData[] = [
    { upperBoundry: 25, fillColor: 'red' },
    { upperBoundry: 10, fillColor: 'blue' },
    { upperBoundry: 35, fillColor: 'green' },
    { upperBoundry: 25, fillColor: 'purple' },
    { upperBoundry: 35, fillColor: 'black' },
    { upperBoundry: 5, fillColor: 'yellow' },
    { upperBoundry: 25, fillColor: 'orange' },
    { upperBoundry: 25, fillColor: 'pink' },
  ]

  const barDataSimple: QsBarData[] = [
    { upperBoundry: 25 },
    { upperBoundry: 10 },
    { upperBoundry: 35 },
    { upperBoundry: 25 },
    { upperBoundry: 35 },
    { upperBoundry: 5 },
    { upperBoundry: 25 },
    { upperBoundry: 25 },
  ]

  const barDataFloating: QsBarData[] = [
    {
      lowerBoundry: 0,
      upperBoundry: 5,
    },
    {
      lowerBoundry: 5,
      upperBoundry: 10,
    },

    {
      lowerBoundry: 25,
      upperBoundry: 35,
    },
    {
      lowerBoundry: 10,
      upperBoundry: 20,
    },
    {
      lowerBoundry: 15,
      upperBoundry: 25,
    },
  ]

  const configOrdinalColors = {
    defaultStrokeWidth: 1,
    defaultStrokeColor: 'orange',
    fillColorScaleData: {
      range: ['green', 'orange', 'red'],
      domain: [1, 70],
      type: QsEnumColorScale.ORDINAL,
    },
  }

  const configSquentialColors = {
    fillColorScaleData: {
      range: ['lightblue', 'steelblue', 'blue'],
      domain: [1, 70],
      type: QsEnumColorScale.SEQUENTIAL,
    },
  }

  const menuElements: JSX.Element[] = [
    <LinearBarsElement
      canvasProps={{
        chartName: 'linearHorizontalBarsMenu',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
      data={barDataSimple}
    />,
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
    />,

    <LinearBarsElement
      canvasProps={{
        chartName: 'linearVerticalBarsMenu',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.VERTICAL}
      data={barDataSimple}
    />,
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
    />,
  ]

  const elements: JSX.Element[] = [
    <LinearBarsElement
      canvasProps={{
        chartName: 'linearBars',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
      data={barDataSimple}
    />,
    <LinearBarsElement
      canvasProps={{
        chartName: 'linearBars',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
      data={barDataFloating}
      config={configOrdinalColors}
    />,

    <LinearBarsElement
      canvasProps={{
        chartName: 'linearBars',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.VERTICAL}
      data={barDataSimple}
    />,
    <LinearBarsElement
      canvasProps={{
        chartName: 'linearBars',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.VERTICAL}
      data={barDataFloating}
      config={configSquentialColors}
    />,
  ]

  const [chart, setChart] = useState<JSX.Element>(elements[0])
  const snipet: string =
    'const onClick = (index: number) => {\n    setChart(elements[index])\n}'

  const content: JSX.Element[] = [
    <Typography variant="body1">Linear Bars are here to stay </Typography>,

    <SyntaxHighlighter language="typescript" style={atomOneDark}>
      {snipet}
    </SyntaxHighlighter>,

    <SyntaxHighlighter language="typescript" style={atomOneDark}>
      {snipet}
    </SyntaxHighlighter>,

    <Box>{chart}</Box>,
  ]

  const onClick = (index: number) => {
    setChart(elements[index])
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Bars
      </Typography>
      <ElementGrid elements={menuElements} onClick={onClick}></ElementGrid>
      <ContentContainer elements={content}></ContentContainer>
    </>
  )
}
