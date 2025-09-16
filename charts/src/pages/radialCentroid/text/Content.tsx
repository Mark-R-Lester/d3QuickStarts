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
import { RadialTextChart } from './TextChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import { QsEnumTextFontWeight, QsEnumTextAnchor } from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 10,
  borderColor: 'grey',
}`

const data1: string = `const data: QsCentroidTextData[] = [
  { value: 7 },
  { value: 3 },
  { value: 9 },
  { value: 2 },
  { value: 6 },
  { value: 8 },
  { value: 1 },
  { value: 4 },
  { value: 10 },
  { value: 5 },
  { value: 3 },
  { value: 7 },
  { value: 2 },
  { value: 9 },
]`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
 canvas.generate.centroid.area(
  {
    highValues: [7, 3, 9, 2, 6, 8, 1, 4, 10, 5, 3, 7, 2, 9],
  },
  {
    defaultFillOpacity: 0.2,
    curve: QsEnumCurve.NATURAL,
  }
)
canvas.generate.centroid.text(data)`

const config2: string = `const config: QsCentroidTextConfig = {
  defaultTextFontSize: 6,
  defaultTextFontWeight: QsEnumTextFontWeight.LIGTHER,
  defaultTextFill: 'darkgreen',
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
}`

const data2: string = `const data: QsCentroidTextData[] = [
  { value: 7, positionalValue: 8 },
  { value: 3, positionalValue: 4 },
  { value: 9, positionalValue: 10 },
  { value: 2, positionalValue: 3 },
  { value: 6, positionalValue: 7 },
  { value: 8, positionalValue: 9 },
  { value: 1, positionalValue: 2 },
  { value: 4, positionalValue: 5 },
  { value: 10, positionalValue: 11 },
  { value: 5, positionalValue: 6 },
  { value: 3, positionalValue: 4 },
  { value: 7, positionalValue: 8 },
  { value: 2, positionalValue: 3 },
  { value: 9, positionalValue: 10 },
]`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.centroid.area(
  {
    highValues: [7, 3, 9, 2, 6, 8, 1, 4, 10, 5, 3, 7, 2, 9],
  },
  {
    defaultFillOpacity: 0.2,
    defaultStrokeColor: 'green',
    defaultStrokeWidth: 0.2,
    curve: QsEnumCurve.NATURAL,
  }
)
canvas.generate.centroid.spokes({
  numberOfSpokes: 14,
  defaultInnerRadius: 5,
  defaultOuterRadius: 102,
  defaultStrokeOpacity: 0.3,
})
canvas.generate.centroid.axis({
  numberOfTicks: 3,
  defaultStrokeOpacity: 0.3,
  defaultAxisAngle: 15,
  showText: false,
})
canvas.generate.centroid.text(data, config)`

const config3: string = `const config: QsCentroidTextConfig = {
  defaultDecimalPoints: 1,
  fixedPositionActive: true,
  fixedPosition: 115,
  defaultTextFontSize: 6,
  defaultTextFill: 'green',
}`

const data3: string = `const data: QsCentroidTextData[] = [
  { value: 7 },
  { value: 3 },
  { value: 9 },
  { value: 2 },
  { value: 6 },
  { value: 8 },
  {
    value: 1,
    text: 'Min',
    textFontSize: 8,
    textFill: 'green',
  },
  { value: 4 },
  {
    value: 10,
    textFontSize: 8,
    textFill: 'red',
  },
  { value: 5 },
  { value: 3 },
  { value: 7 },
  { value: 2 },
  { value: 9 },
]`

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
              Centroid Text is an integral component of the Centroid suite,
              engineered for seamless integration with other Centroid elements
              to enhance data visualization. It automatically computes
              positioning relative to chart data points, ensuring precise
              annotations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    By default, Centroid Text is positioned precisely at the
                    data point it represents, ensuring accurate alignment with
                    the underlying dataset. However, this placement may not
                    always be ideal due to potential issues like overlapping
                    text, cluttered visuals, or reduced readability in dense
                    datasets. To address this, Centroid Text can be offset or
                    moved to a fixed position.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialTextChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 10,
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
              Configuration settings control arc text appearance, allowing
              precise customization of visual attributes like font, color, and
              orientation. By adjusting config and data parameters, arc text can
              be styled to meet specific aesthetic needs.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This demo highlights customizable configuration parameters
                    for Centroid Text, adjustmenting various attributes.
                    Positional values are included to shift text away from data
                    points, depending on your visualisation this can minimize
                    overlap and enhance clarity.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialTextChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      highestViewableValue: 10,
                    }}
                    config={{
                      defaultTextFontSize: 6,
                      defaultTextFontWeight: QsEnumTextFontWeight.LIGTHER,
                      defaultTextFill: 'darkgreen',
                      defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
                    }}
                    data={[
                      { value: 7, positionalValue: 8 },
                      { value: 3, positionalValue: 4 },
                      { value: 9, positionalValue: 10 },
                      { value: 2, positionalValue: 3 },
                      { value: 6, positionalValue: 7 },
                      { value: 8, positionalValue: 9 },
                      { value: 1, positionalValue: 2 },
                      { value: 4, positionalValue: 5 },
                      { value: 10, positionalValue: 11 },
                      { value: 5, positionalValue: 6 },
                      { value: 3, positionalValue: 4 },
                      { value: 7, positionalValue: 8 },
                      { value: 2, positionalValue: 3 },
                      { value: 9, positionalValue: 10 },
                    ]}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Here, the text is set to a fixed position, though Arc Text
                    may be better suited for this purpose. Data can be used to
                    customize individual text items, prioritizing those of
                    greater importance.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config3} />
                  <ContentCodeBox code={data3} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialTextChart
                    canvasConfig={{
                      chartName: 'chart4',
                      width: 600,
                      highestViewableValue: 10,
                    }}
                    config={{
                      defaultDecimalPoints: 1,
                      fixedPositionActive: true,
                      fixedPosition: 115,
                      defaultTextFontSize: 6,
                      defaultTextFill: 'green',
                    }}
                    data={[
                      { value: 7 },
                      { value: 3 },
                      { value: 9 },
                      { value: 2 },
                      { value: 6 },
                      { value: 8 },
                      {
                        value: 1,
                        text: 'Min',
                        textFontSize: 8,
                        textFill: 'green',
                      },
                      { value: 4 },
                      {
                        value: 10,
                        textFontSize: 8,
                        textFill: 'red',
                      },
                      { value: 5 },
                      { value: 3 },
                      { value: 7 },
                      { value: 2 },
                      { value: 9 },
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

const data: string = `interface QsCentroidTextData {
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

const config: string = `interface QsCentroidTextConfig = {
 layerType?: QsEnumLayerType
  x?: number
  y?: number
  fixedPositionActive?: boolean
  fixedPosition?: number
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

const dataExample: string = `const data: QsCentroidTextData = {
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

const configExample: string = `const config: QsCentroidTextConfig =  {
  layerType: QsEnumLayerType.UNBOUND
  x: 50
  y: 50
  fixedPositionActive: false
  fixedPosition: 100
  defaultDecimalPoints: 0
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
  highestViewableValue: 10,
  borderColor: 'grey',
}
${config3}
${data3}
${chart2}`}
  ></ChartEditor>
)
