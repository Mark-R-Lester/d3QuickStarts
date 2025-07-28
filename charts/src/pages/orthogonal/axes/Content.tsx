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
import { OrthogonalAxisChart } from './AxisConfigChart'
import { AxiesDefaultsChart } from './AxesDefaultsChart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'chart',
  width: 600,
  highestViewableValue: 100,
  borderColor: 'grey',
} 
`

const defaultsChart: string = `
const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

const configChart: string = `
  const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

  canvas.generate.orthogonal.vertical.axis.left([], {
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
  canvas.generate.orthogonal.horizontal.axis.bottom(data1, {
    percentageMovement: 0,
    tickSizeInner: 2,
    tickSizeOuter: 0,
    tickPadding: 0,
    domainWidth: 3,
    domainOpacity: 1,
    scale: {
      type: QsEnumAxisScaleType.BANDED,
      domain: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    }
    

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

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

const config: string = `export interface QsAxisConfig {
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

const configExample: string = `const axisConfig: QsAxisConfig = {
  percentageMovement: 0,

  domainColor: 'blue',
  domainOpacity: 1,
  domainWidth: 3,
  scale: {
    type: QsEnumAxisScaleType.BANDED,
    domain: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
  }
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

export const defaultsContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Axes with default settings</ContentTitle>,
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
                    {defaultsChartAll}
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

export const configContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Axes with with a large config</ContentTitle>,

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
                    {configChartAll}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            ></ContentRow>,
            <OrthogonalAxisChart
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
      <ContentTitle variant="h4">QsAxisConfig</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">Interface:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {config}
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
                    {configExample}
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
    borderColor: 'grey',
  }
  ${configChart}`}
  />
)
