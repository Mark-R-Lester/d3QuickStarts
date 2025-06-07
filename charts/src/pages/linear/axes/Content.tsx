import { Typography } from '@mui/material'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import {
  ContentTitle,
  ContentBox,
  ContentTextBox,
  ContentSyntaxBox,
} from '../../../components/atoms/content/ContentStyled'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import { LinearAxisChart } from './AxisConfigChart'
import { AxiesDefaultsChart } from './AxesDefaultsChart'

const axisDefaults: string = `canvasConfig: QsCanvasConfig = {
  chartName: 'axesDefaults',
  width: 600,
  highestViewableValue: 100,
  borderColor: 'black',
}

const canvas: QsCanvas = qsCreateCanvas(canvasConfig)
canvas.generate.linear.vertical.axis.left([])
canvas.generate.linear.horizontal.axis.bottom([])`

const axisConfig: string = `const canvasConfig =  QsCanvasConfig {
  const data1 = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
  const data2 = [0, 20, 20, 30, 20, 35, 0, 20, 15, 30, 10, 50]
  const canvas: QsCanvas = qsCreateCanvas(canvasProps)

  canvas.generate.linear.vertical.axis.left(data2, {
    tickSizeInner: -100,
    tickSizeOuter: 1,
    tickPadding: 2,
    tickColor: 'lightgrey',
    domainWidth: 3,
    numberOfTicks: 10,
    domainOpacity: 1,
    percentageMovement: 0,
    textFont: QsEnumTextFont.SERIF,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textFontStyle: QsEnumTextFontStyle.ITALIC,
    textFontSize: 3,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textAngle: 0,
    textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
    textAnchor: QsEnumTextAnchor.END,
    textX: -20,
    textY: 0,
  })
  canvas.generate.linear.horizontal.axis.bottom(data1, {
    percentageMovement: 0,
    tickSizeInner: 2,
    tickSizeOuter: 0,
    tickPadding: 0,
    domainWidth: 3,
    domainOpacity: 1,
    domainScale: QsEnumAxisScaleType.BANDED,
    

    textFont: QsEnumTextFont.SERIF,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontSize: 6,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textAngle: 90,
    textAlignmentBaseline: QsEnumAlignmentBaseline.BASELINE,
    textAnchor: QsEnumTextAnchor.START,
    textStroke: 'blue',
    textFill: 'green',
    textX: 20,
    textY: 0,
  })
}`

const qsAxisConfig: string = `export interface QsAxisConfig {
  [key: string]: number | boolean | string | undefined
  percentageMovement?: number

  domainColor?: string
  domainOpacity?: number
  domainWidth?: number
  domainScale?: QsEnumAxisScaleType
  tickColor?: string
  tickOpacity?: number
  tickWidth?: number
  tickSizeInner?: number
  tickSizeOuter?: number
  tickPadding?: number
  numberOfTicks?: number

  textFont?: QsEnumTextFont | string
  textFontSize?: number
  textFontStyle?: QsEnumTextFontStyle
  textFontWeight?: QsEnumTextFontWeight | number
  textDecorationLine?: QsEnumTextDecorationLine
  textFill?: string
  textAngle?: number
  textAnchor?: QsEnumTextAnchor
  textStroke?: string
  textAlignmentBaseline?: QsEnumAlignmentBaseline
  textX?: number
  textY?: number
}`

const axisConfigExample: string = `const axisConfig: QsAxisConfig = {
  percentageMovement: 0,

  domainColor: 'blue',
  domainOpacity: 1,
  domainWidth: 3,
  domainScale: QsEnumAxisScaleType.BANDED,
  tickColor:'blue',
  tickOpacity: 1,
  tickWidth: 1,
  tickSizeInner: 2,
  tickSizeOuter: 0,
  tickPadding: 0,
  numberOfTicks: 10,
  
  textFont: QsEnumTextFont.SERIF,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontSize: 6,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textAngle: 90,
  textAlignmentBaseline: QsEnumAlignmentBaseline.BASELINE,
  textAnchor: QsEnumTextAnchor.START,
  textStroke: 'blue',
  textFill: 'green',
  textX: 20,
  textY: 0,
}`

export const axiesDefaults: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">A blank canvas</ContentTitle>,
      <ContentBox>
        <Typography variant="body1">Some content</Typography>
      </ContentBox>,
      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">Some content</Typography>
                </ContentTextBox>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers={true}
                  >
                    {axisDefaults}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            ></ContentRow>,
            <AxiesDefaultsChart
              canvasProps={{
                chartName: 'chart',
                width: 600,
                lowestViewableValue: 0,
                highestViewableValue: 100,
                borderColor: 'black',
              }}
            />,
          ]}
        ></ContentColumn>
      </ContentBox>,
    ]}
  ></ContentColumn>
)

export const canvasWithVisibleDisplayArea: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">The canvas display area</ContentTitle>,

      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">Some content1</Typography>
                  <br />
                  <Typography variant="body1">Some content2</Typography>
                  <br />
                  <Typography variant="body1">Some content3</Typography>
                </ContentTextBox>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers={true}
                  >
                    {axisConfig}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            ></ContentRow>,
            <LinearAxisChart
              canvasProps={{
                chartName: 'chart1',
                width: 600,
                highestViewableValue: 100,
                marginBottom: 20,
                borderColor: 'black',
              }}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  ></ContentColumn>
)

export const configAndData: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">QsCanvasConfig</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">Interface:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {qsAxisConfig}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentSyntaxBox>
                  {' '}
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {axisConfigExample}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

export const editorContent: JSX.Element = (
  <ChartEditor
    initialCode={`
  const canvasConfig = {
    chartName: 'ChartEditable',
    width: 600,
    highestViewableValue: 100,
    marginBottom: 20,
    borderColor: 'black',
  }
  const data1 = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
  const data2 = [0, 20, 20, 30, 20, 35, 0, 20, 15, 30, 10, 50]
  const canvas: QsCanvas = qsCreateCanvas(canvasConfig)

  canvas.generate.linear.vertical.axis.left(data2, {
    tickSizeInner: -100,
    tickSizeOuter: 1,
    tickPadding: 2,
    tickColor: 'lightgrey',
    domainWidth: 3,
    numberOfTicks: 10,
    domainOpacity: 1,
    percentageMovement: 0,
    textFont: QsEnumTextFont.SERIF,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textFontStyle: QsEnumTextFontStyle.ITALIC,
    textFontSize: 3,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textAngle: 0,
    textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
    textAnchor: QsEnumTextAnchor.END,
    textX: -20,
    textY: 0,
  })
  canvas.generate.linear.horizontal.axis.bottom(data1, {
    tickSizeInner: 2,
    tickSizeOuter: 0,
    tickPadding: 0,
    domainWidth: 3,
    domainOpacity: 1,
    domainScale: QsEnumAxisScaleType.BANDED,
    percentageMovement: 0,
    textFont: QsEnumTextFont.SERIF,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontSize: 6,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textAngle: 90,
    textAlignmentBaseline: QsEnumAlignmentBaseline.BASELINE,
    textAnchor: QsEnumTextAnchor.START,
    textStroke: 'blue',
    textFill: 'green',
    textX: 20,
    textY: 0,
  })`}
  />
)
