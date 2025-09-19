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
import { UnboundLegendChart } from './UnboundLegendChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'
import { QsEnumShape } from 'd3qs/core/customShapes/qsEnums'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 35,
}`

const data1: string = `const data: QsLegendData[] = [
  { value: 'Red', fillColor: 'red' },
  { value: 'Blue', fillColor: 'blue' },
  { value: 'Green', fillColor: 'green' },
  { value: 'Purple', fillColor: 'purple' },
]`

const chart1: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.unbound.legend(data)`

const config2: string = `const data: QsLegendConfig[] = {}`

const data2: string = `const data: QsLegendData[] = [
  { value: 'Red', fillColor: 'red' },
  { value: 'Blue', fillColor: 'blue' },
  { value: 'Green', fillColor: 'green' },
  { value: 'Purple', fillColor: 'purple' },
]`

const chart2: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.unbound.legend(data)`

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
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <UnboundLegendChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 10,
                      marginLeft: 35,
                      borderColor: 'black',
                    }}
                    config={{
                      x: 2,
                      y: 10,
                      height: 3,
                      width: 3,
                      verticalSpacing: 5,
                      relativeTextX: 6,
                      relativeTextY: 1,
                      defaultTextFont: QsEnumTextFont.SERIF,
                      defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
                      defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
                      defaultTextFontSize: 5,
                      defaultTextDecorationLine:
                        QsEnumTextDecorationLine.NORMAL,
                      defaultTextAngle: 0,
                      defaultTextAlignmentBaseline:
                        QsEnumAlignmentBaseline.CENTRAL,
                      defaultTextAnchor: QsEnumTextAnchor.START,
                      defaultTextFill: 'black',
                      shape: {
                        type: QsEnumShape.RECTANGLE,
                        config: {
                          height: 5,
                          width: 5,
                        },
                      },
                      // shape: {
                      //   type: QsEnumShape.CIRCLE,
                      //   config: {
                      //     radius: 3,
                      //   },
                      // },
                      // shape: {
                      //   type: QsEnumShape.POLYGON,
                      //   config: {
                      //     sides: 6,
                      //     radius: 3,
                      //   },
                      // },
                      // shape: {
                      //   type: QsEnumShape.STAR,
                      //   config: {
                      //     points: 6,
                      //     outerRadius: 3,
                      //     innerRadius: 1.5,
                      //     heightAnchor: QsHeightAnchor.MIDDLE,
                      //   },
                      // },
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
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <UnboundLegendChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 10,
                      marginLeft: 35,
                      borderColor: 'black',
                    }}
                    data={[
                      { value: 'Red', fillColor: 'red' },
                      { value: 'Blue', fillColor: 'blue' },
                      { value: 'Green', fillColor: 'green' },
                      { value: 'Purple', fillColor: 'purple' },
                    ]}
                    config={{
                      x: 10,
                      y: 50,
                      height: 2,
                      width: 10,
                      verticalSpacing: 10,
                      relativeTextX: 0,
                      relativeTextY: 5,
                      defaultTextFont: QsEnumTextFont.SERIF,
                      defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
                      defaultTextFontStyle: QsEnumTextFontStyle.ITALIC,
                      defaultTextFontSize: 5,
                      defaultTextDecorationLine:
                        QsEnumTextDecorationLine.NORMAL,
                      defaultTextAngle: 0,
                      defaultTextAlignmentBaseline:
                        QsEnumAlignmentBaseline.CENTRAL,
                      defaultTextAnchor: QsEnumTextAnchor.START,
                      defaultTextStroke: 'black',
                      defaultTextFill: 'black',
                      shape: {
                        type: QsEnumShape.CIRCLE,
                        config: {
                          radius: 3,
                        },
                      },
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

const data: string = `interface QsTextData {
  value: number
  text?: string
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

const config: string = `interface QsTextConfig {
  [key: string]: number | QsColorScaleData | string | undefined
  scaleType?: QsEnumScaleType
  defaultDecimalPoints?: number
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

const dataExample: string = `const data: QsTextData = {
  value: 27,
  text: 'this is what you will see if added',
  textFont: QsEnumTextFont.SERIF,
  textFontSize: 10,
  textFontStyle: QsEnumTextFontStyle.ITALIC,
  textFontWeight: QsEnumTextFontWeight.BOLD,
  textDecorationLine: QsEnumTextDecorationLine.OVERLINE,
  textFill: 'blue',
  textAngle: 45,
  textAnchor: QsEnumTextAnchor.START,
  textStroke:  'blue',
  textAlignmentBaseline: QsEnumAlignmentBaseline.CENTER,
}`

const configExample: string = `const config: QsTextConfig = {
  scaleType: QsEnumScaleType.BANDED,
  defaultDecimalPoints: 3,
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
  lowestViewableValue: 0,
  highestViewableValue: 35,
  borderColor: 'grey',
}
${data1}
${chart1}`}
  ></ChartEditor>
)
