import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { EnumOrientation } from '../../../common/enums'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentChartBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { OrthogonalTextChart } from './OrthogonalTextChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import {
  QsEnumAlignmentBaseline,
  QsEnumScaleType,
  QsEnumTextAnchor,
} from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'chart',
  width: 600,
  highestViewableValue: 35,
}`

const data1: string = `const data: QsTextData[] = [
  { value: 25 },
  { value: 10 },
  { value: 35 },
  { value: 25 },
  { value: 35 },
  { value: 5 },
  { value: 25 },
  { value: 25 },
]`

const dataComplex: string = `const data: QsTextData[] = [
  { value: 25, textAnchor: QsEnumTextAnchor.START },
  { value: 10 },
  { value: 35 },
  { value: 25 },
  { value: 45, textFill: 'red' },
  { value: 5 },
  { value: 25 },
  { value: 25, textAnchor: QsEnumTextAnchor.END },
]`

const dataBanded: string = `const data: QsTextData[] = [
  { value: 25, positionalValue: 12.5 },
  { value: 10, positionalValue: 5 },
  { value: 35, positionalValue: 17.5 },
  { value: 25, positionalValue: 12.5 },
  {
    value: 45,
    positionalValue: 22.5,
    text: 'RED',
    textFill: 'red',
    textFontSize: 8,
  },
  { value: 5, positionalValue: 2.5 },
  { value: 25, positionalValue: 12.5 },
  { value: 25, positionalValue: 12.5 },
]`

const configComplex: string = `const config: QsTextConfig = {
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
  defaultTextFontSize: 6,
  defaultTextFill: 'blue',
}`

const configBanded: string = `const config: QsTextConfig = {
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
  defaultTextFontSize: 6,
  defaultTextFill: 'blue',
  scaleType: QsEnumScaleType.BANDED,
}`

const chartH: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.text(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.POINT,
      domain: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  }
)`

const chartV: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.vertical.text(data)
canvas.generate.orthogonal.vertical.axis.left({
  scale: {
    type: QsEnumAxisScaleType.POINT,
    domain: [1, 2, 3, 4, 5, 6, 7, 8],
  },
})
canvas.generate.orthogonal.horizontal.axis.bottom()`

const lineChart: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.line({
  values: [25, 10, 35, 25, 45, 5, 25, 25],
})
canvas.generate.orthogonal.horizontal.text(data, config)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.POINT,
      domain: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  }
)`

const barChart: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.bars([
  { highValue: 25 },
  { highValue: 10 },
  { highValue: 35 },
  { highValue: 25 },
  { highValue: 45 },
  { highValue: 5 },
  { highValue: 25 },
  { highValue: 25 },
])
canvas.generate.orthogonal.horizontal.text(data, config)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.POINT,
      domain: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  }
)`

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
              Orthogonal text in data visualizations, such as charts or graphs,
              refers to text labels or annotations that are aligned
              perpendicularly (typically horizontally or vertically) within the
              canvas coordinate system. This alignment ensures that values are
              displayed precisely in relation to the underlying data points,
              enhancing clarity and professionalism in visualizations like bar
              charts
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplying only essential data, the text element
                    produces a visualization using the library's default
                    configuration parameters. By default, the text is designed
                    to be positioned centrally over a point on the xis. As shown
                    here, both the x-axis and text use a point scale for
                    horizontal positioning, resulting in text being cut off at
                    the boundaries. This can be addressed in various ways.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chartH} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalTextChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 50,
                    }}
                    orientation={EnumOrientation.HORIZONTAL}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    The text element, when oriented vertically, functions
                    identically to its horizontal counterpart in terms of
                    configuration and behavior, with the only distinction being
                    its alignment along the vertical axis of the canvas's
                    coordinate system.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chartV} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalTextChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 50,
                    }}
                    orientation={EnumOrientation.VERTICAL}
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
              Adjusting the configuration parameters or input data can
              substantially change the visual appearance of the points element,
              enabling diverse and tailored data visualizations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This chart demonstrates the impact config and data. While
                    the positioning at the boundies has been improved the
                    vertical positioning could be better.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    LINEAR
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={configComplex} />
                  <ContentCodeBox code={dataComplex} />
                  <ContentCodeBox code={lineChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalTextChart
                    canvasConfig={{
                      chartName: 'chart3',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 50,
                    }}
                    orientation={EnumOrientation.HORIZONTAL}
                    config={{
                      defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
                      textAlignmentBaseline:
                        QsEnumAlignmentBaseline.TEXT_AFTER_EDGE,
                      defaultTextFontSize: 6,
                      defaultTextFill: 'blue',
                      scaleType: QsEnumScaleType.LINEAR,
                    }}
                    data={[
                      { value: 25, textAnchor: QsEnumTextAnchor.START },
                      { value: 10 },
                      { value: 35 },
                      { value: 25 },
                      { value: 45, textFill: 'red' },
                      { value: 5 },
                      { value: 25 },
                      { value: 25, textAnchor: QsEnumTextAnchor.END },
                    ]}
                  />
                </ContentChartBox>,
              ]}
            />,
          ]}
        />

        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This chart illustrates the use of text banding to align with
                    bars. It also demonstrates how positionalValue can position
                    text independently of its actual value, with the option to
                    override the displayed value.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    BANDED
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={configBanded} />
                  <ContentCodeBox code={dataBanded} />
                  <ContentCodeBox code={barChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalTextChart
                    canvasConfig={{
                      chartName: 'chart4',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 50,
                    }}
                    orientation={EnumOrientation.HORIZONTAL}
                    config={{
                      defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
                      defaultTextFontSize: 6,
                      defaultTextFill: 'blue',
                      scaleType: QsEnumScaleType.BANDED,
                    }}
                    data={[
                      { value: 25, positionalValue: 12.5 },
                      { value: 10, positionalValue: 5 },
                      { value: 35, positionalValue: 17.5 },
                      { value: 25, positionalValue: 12.5 },
                      {
                        value: 45,
                        positionalValue: 22.5,
                        text: 'RED',
                        textFill: 'red',
                        textFontSize: 8,
                      },
                      { value: 5, positionalValue: 2.5 },
                      { value: 25, positionalValue: 12.5 },
                      { value: 25, positionalValue: 12.5 },
                    ]}
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
  positionalValue?: number
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
  useDataArea?: boolean
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
  positionalValue?: 10
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
  useDataArea: true
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
  highestViewableValue: 50,
  borderColor: 'grey',
}
${configBanded}
${dataBanded}
${barChart}`}
  ></ChartEditor>
)
