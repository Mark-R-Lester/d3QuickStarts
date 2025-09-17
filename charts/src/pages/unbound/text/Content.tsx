import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentChartBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { UnboundTextChart } from './UnboundTextChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import {
  QsEnumTextAnchor,
  QsEnumTextFont,
  QsEnumTextFontStyle,
} from 'd3qs/d3QuickStart'

const canvasConfig1: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  lowestViewableValue: 0,
  highestViewableValue: 10,
  marginLeft: 30,
  borderColor: 'black',
}`

const data1: string = `const data1: QsUnboundTextData[] = [
  { x: 2, y: 90, text: 'Using unbound' },
  { x: 2, y: 85, text: 'text to provide' },
  { x: 2, y: 80, text: 'information' },
  { x: 2, y: 70, text: 'How many of' },
  { x: 2, y: 65, text: 'each fruit do I' },
  { x: 2, y: 60, text: 'eat each week' },
]`

const chart1: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.bars(
  [
    { highValue: 9 },
    { highValue: 4 },
    { highValue: 6 },
    { highValue: 2 },
    { highValue: 8 },
    { highValue: 10 },
  ],
  {
    fillColorScaleData: {
      type: QsEnumColorScale.ORDINAL,
      range: [
        '#DC143C',
        '#DAA520',
        '#FF4500',
        '#FF8C00',
        '#228B22',
        '#534c0cff',
      ],
    },
  }
)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
  textFontSize: 3,
  scale: {
    type: QsEnumAxisScaleType.BANDED,
    domain: ['APPLE', 'MANGO', 'KIWI', 'FIG', 'DATE', 'GRAPE'],
  },
})
canvas.generate.unbound.text(data1)
}`

const canvasConfig2: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  lowestViewableValue: 0,
  highestViewableValue: 10,
  marginTop: 20,
  borderColor: 'black',
}`

const config2: string = `const config1: QsUnboundTextConfig = {
  defaultTextFont: QsEnumTextFont.BRUSH_SCRIPT_MT,
  defaultTextFontSize: 12,
  defaultTextFill: '#6a6714ff',
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
}
const config2: QsUnboundTextConfig = {
  defaultTextFont: QsEnumTextFont.FANTASY,
  defaultTextFontSize: 25,
  defaultTextFontStyle: QsEnumTextFontStyle.ITALIC,
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
  defaultTextAngle: 30,
  defaultTextStroke: 'red',
}`

const data2: string = `const data1: QsUnboundTextData[] = [
  {
    x: 50,
    y: 90,
    text: 'Fruit comsumed last week',
  }
]
const data2: QsUnboundTextData[] =[
  {
    x: 50,
    y: 50,
    text: 'Do not use: fake data',
  }
]`

const chart2: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.bars(
  [
    { highValue: 9 },
    { highValue: 4 },
    { highValue: 6 },
    { highValue: 2 },
    { highValue: 8 },
    { highValue: 10 },
  ],
  {
    fillColorScaleData: {
      type: QsEnumColorScale.ORDINAL,
      range: [
        '#DC143C',
        '#DAA520',
        '#FF4500',
        '#FF8C00',
        '#228B22',
        '#534c0cff',
      ],
    },
  }
)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
  textFontSize: 3,
  scale: {
    type: QsEnumAxisScaleType.BANDED,
    domain: ['APPLE', 'MANGO', 'KIWI', 'FIG', 'DATE', 'GRAPE'],
  },
})
canvas.generate.unbound.text(data1, config1)
canvas.generate.unbound.text(data2, config2)`

export const defaultsContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              Defaults
            </Typography>,
            <Typography variant="body1">
              In QS, unbound text elements offer flexible annotation
              capabilities, allowing developers to place custom text anywhere on
              a chart without tying it to data points or axes. Built-in via the
              UnboundText element, it supports absolute positioning (x, y
              coordinates), rotation, styling (font, color, size). Ideal for
              labels, notes, headings etc.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This example demonstrates the default settings for unbound
                    text in the QS charting library. A boundary is applied to
                    the chart, making the margins around the data visible.
                    Notably, the left margin is expanded to accommodate the
                    text, ensuring proper placement and readability.
                  </Typography>
                  <ContentCodeBox code={canvasConfig1} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <UnboundTextChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 10,
                      marginLeft: 30,
                      borderColor: 'black',
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,
          ]}
        />

        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              Using config and data to modify appearance
            </Typography>,
            <Typography variant="body1">
              Styling unbound text enhances a chart's visual appeal by ensuring
              readability and aesthetic harmony. Customizable fonts, colors,
              sizes, and rotations allow text to complement the chart's design,
              highlight key insights, and maintain a polished, professional
              look, improving user engagement and clarity.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This example showcases default settings for unbound text in
                    the QS charting library. A boundary is applied, revealing
                    chart margins, with the top margin expanded to fit the
                    aesthetically styled text, ensuring proper placement and
                    readability. Additional text demonstrates flexible
                    placement, styled for visual impact.
                  </Typography>
                  <ContentCodeBox code={canvasConfig2} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <UnboundTextChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 10,
                      marginTop: 20,
                      borderColor: 'black',
                    }}
                    data1={[
                      {
                        x: 50,
                        y: 90,
                        text: 'Fruit comsumed last week',
                      },
                    ]}
                    config1={{
                      defaultTextFont: QsEnumTextFont.BRUSH_SCRIPT_MT,
                      defaultTextFontSize: 12,
                      defaultTextFill: '#6a6714ff',
                      defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
                    }}
                    data2={[
                      {
                        x: 50,
                        y: 50,
                        text: 'Do not use: fake data',
                      },
                    ]}
                    config2={{
                      defaultTextFont: QsEnumTextFont.FANTASY,
                      defaultTextFontSize: 25,
                      defaultTextFontStyle: QsEnumTextFontStyle.ITALIC,
                      defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
                      defaultTextAngle: 30,
                      defaultTextStroke: 'red',
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

const data: string = `interface QsUnboundTextData {
  x: number,
  y: number,
  text: string
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
}`

const config: string = `interface QsUnboundTextConfig {
  defaultTextFont?: QsEnumTextFont | string
  defaultTextFontSize?: number
  defaultTextFontStyle?: QsEnumTextFontStyle
  defaultTextFontWeight?: QsEnumTextFontWeight | number
  defaultTextDecorationLine?: QsEnumTextDecorationLine
  defaultTextFill?: string
  defaultTextAngle?: number
  defaultTextAnchor?: QsEnumTextAnchor
  defaultTextStroke?: string
  defaultTextAlignmentBaseline?: QsEnumAlignmentBaseline
}`

const dataExample: string = `const data: QsUnboundTextData = {
  x: 10,
  y: 20,
  text: 'hello world'
  textFont: QsEnumTextFont.SANS_SERIF
  textFontSize: 10
  textFontStyle: QsEnumTextFontStyle.ITALIC
  textFontWeight:  QsEnumTextFontWeight.BOLD
  textDecorationLine:  QsEnumTextDecorationLine.OVERLINE
  textFill: 'blue'
  textAngle: 45
  textAnchor: QsEnumTextAnchor.START
  textStroke: 'black'
  textAlignmentBaseline: QsEnumAlignmentBaseline.CENTER
}`

const configExample: string = `const config: QsUnboundTextConfig = {
  defaultTextFont: QsEnumTextFont.SANS_SERIF
  defaultTextFontSize: 10,
  defaultTextFontStyle: QsEnumTextFontStyle.ITALIC,
  defaultTextFontWeight: QsEnumTextFontWeight.BOLD,
  defaultTextDecorationLine: QsEnumTextDecorationLine.OVERLINE,
  defaultTextFill: 'blue',
  defaultTextAngle: 45,
  defaultTextAnchor: QsEnumTextAnchor.START,
  defaultTextStroke:  'blue',
  defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.CENTER,
}`

export const configAndData: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              Data
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Interface
                  </Typography>
                  <ContentCodeBox code={data} />
                </ContentTextBox>,
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Example
                  </Typography>
                  <ContentCodeBox code={dataExample} />
                </ContentTextBox>,
              ]}
            />,
          ]}
        />

        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              Config
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Interface
                  </Typography>
                  <ContentCodeBox code={config} />
                </ContentTextBox>,
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Example
                  </Typography>
                  <ContentCodeBox code={configExample} />
                </ContentTextBox>,
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
  highestViewableValue: 10,
  borderColor: 'grey',
}
${canvasConfig2}
${config2}
${data2}
${chart2}`}
  ></ChartEditor>
)
