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
import { SliceChart } from './SliceChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import { QsEnumColorScale } from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 40,
}`

const data1: string = `
const data: QsArcSliceData[] = [{ valueArc: 10 }, { valueArc: 20 }, { valueArc: 15 }]`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.arc.slice(data, config)`

const config2: string = `
const config: QsArcSliceConfig ={
  outerRadius: 100,
  innerRadius: 30,
  padding: 0.9,
  fillColorScaleData: {
    type: QsEnumColorScale.ORDINAL,
    range: ['orange', 'red', 'blue'],
  },
}`

const data2: string = `
const data: QsArcSliceData[] = [{ valueArc: 10 }, { valueArc: 20 }, { valueArc: 15 }]`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.arc.slice(data, config)`

const config3: string = `const config: QsArcSliceConfig = {
  outerRadius: 100,
  innerRadius: 80,
  padding: 0,
  fillColorScaleData: {
    type: QsEnumColorScale.ORDINAL,
    range: [
      '#1B9AAA',
      '#3D5A80',
      '#4682B4',
      '#87CEEB',
      '#191970',
      '#A8C686',
      '#81C784',
      '#2E8B57',
      '#98FB98',
      '#006400',
    ],
  },
}`

const config3_2: string = `const config2: QsArcSliceConfig = {
  outerRadius: 78,
  innerRadius: 0,
  padding: 0,
  fillColorScaleData: {
    type: QsEnumColorScale.ORDINAL,
    range: ['blue', 'green'],
  },
}`

const data3: string = `const data: QsArcSliceData[] = [
  { valueArc: 13 },
  { valueArc: 17 },
  { valueArc: 15 },
  { valueArc: 15 },
  { valueArc: 20 },
  { valueArc: 17 },
  { valueArc: 17 },
  { valueArc: 16 },
  { valueArc: 15 },
  { valueArc: 15 },
]`

const data3_2: string = `const data2: QsArcSliceData[] = [
  { valueArc: 50 }, { valueArc: 50 }
]`

const chart3: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.arc.slice(data, config)
canvas.generate.arc.slice(data2, config2)
canvas.generate.arc.text.horizontal(
  [
    { value: 50, text: 'blues' },
    { value: 50, text: 'greens' },
  ],
  {
    radius: 30,
    scaleType: QsEnumScaleType.BANDED,
    textFontSize: 10,
    textFill: 'white',
  }
)
canvas.generate.arc.text.follow(
  [
    { value: 13, text: 'Deep Teal' },
    { value: 17, text: 'Slate Blue' },
    { value: 15, text: 'Steel Blue' },
    { value: 15, text: 'Sky Blue' },
    { value: 20, text: 'Midnight Blue' },
    { value: 17, text: 'Sage Green' },
    { value: 17, text: 'Mint Green' },
    { value: 16, text: 'Sea Green' },
    { value: 15, text: 'Pale Green' },
    { value: 15, text: 'Dark Green' },
  ],
  {
    scaleType: QsEnumScaleType.BANDED,
    textFontSize: 4,
    radius: 88,
    textFill: 'white',
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
              A pie chart displays data as proportional slices, where each slice
              represents a category’s contribution to the whole, with the angle
              or area reflecting its value. To create a doughnut chart, adjust
              the inner radius to a non-zero value, forming a hollow center,
              while the outer radius defines the chart’s size. For nested
              doughnut charts, multiple datasets are used, each with distinct
              inner and outer radii to create concentric rings. Adjusting these
              radii allows customization of ring thickness and spacing,
              enhancing visual clarity and enabling layered data representation
              in a compact, professional format.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    The default setting for slices assigns each slice a the same
                    solid color. Spacing, is included between slices to enhance
                    visual separation and improving readability.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SliceChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 40,
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
              Modifying a pie or donut chart’s configuration and data can
              significantly change how slices look. Adjusting the border color
              (stroke) of slices increases contrast, using distinct or
              complementary colors for better visibility. Opacity settings can
              make slices semi-transparent, creating a softer or layered
              appearance. Adding text, such as labels or values, directly on
              slices enhances clarity by showing category names or percentages.
              Changing data values alters slice sizes, while tweaking settings
              like border width or chart radius allows for further
              customization, resulting in clear, professional, and visually
              appealing charts.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    With very little modification slices begin to look radically
                    different.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SliceChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 40,
                    }}
                    config={{
                      outerRadius: 100,
                      innerRadius: 30,
                      padding: 0.9,
                      fillColorScaleData: {
                        type: QsEnumColorScale.ORDINAL,
                        range: ['orange', 'red', 'blue'],
                      },
                    }}
                  />
                  ,
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    With a little imagination it's fairly simple to create quite
                    detailed visualisations. Here text is used to provide
                    meaning to the slices.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config3} />
                  <ContentCodeBox code={config3_2} />
                  <ContentCodeBox code={data3} />
                  <ContentCodeBox code={data3_2} />
                  <ContentCodeBox code={chart3} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SliceChart
                    canvasConfig={{
                      chartName: 'chart3',
                      width: 600,
                      highestViewableValue: 40,
                    }}
                    data={[
                      { valueArc: 13 },
                      { valueArc: 17 },
                      { valueArc: 15 },
                      { valueArc: 15 },
                      { valueArc: 20 },
                      { valueArc: 17 },
                      { valueArc: 17 },
                      { valueArc: 16 },
                      { valueArc: 15 },
                      { valueArc: 15 },
                    ]}
                    config={{
                      outerRadius: 100,
                      innerRadius: 80,
                      padding: 0,
                      fillColorScaleData: {
                        type: QsEnumColorScale.ORDINAL,
                        range: [
                          '#1B9AAA',
                          '#3D5A80',
                          '#4682B4',
                          '#87CEEB',
                          '#191970',
                          '#A8C686',
                          '#81C784',
                          '#2E8B57',
                          '#98FB98',
                          '#006400',
                        ],
                      },
                    }}
                    config2={{
                      outerRadius: 78,
                      innerRadius: 0,
                      padding: 0,
                      fillColorScaleData: {
                        type: QsEnumColorScale.ORDINAL,
                        range: ['blue', 'green'],
                      },
                    }}
                    data2={[{ valueArc: 50 }, { valueArc: 50 }]}
                  />
                  ,
                </ContentChartBox>,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

const data: string = `interface QsArcSliceData {
  valueArc: number
  valueRad?: never
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsArcSliceConfig {
  outerRadius?: number
  innerRadius?: number
  padding?: number
  x?: number
  y?: number
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}`

const dataExample: string = `const data: QsArcSliceData = {
  valueArc: 20
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsArcSliceConfig = {
  layerType: QsEnumLayerType
  outerRadius: 90,
  innerRadius: 0,
  padding: 3,
  x: 50,
  y: 50,
  defaultFillColor: 'blue',
  defaultFillOpacity: 1,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 1,
  defaultStrokeOpacity: 1,
  fillColorScaleData: {
    domain: [1, 100],
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.SEQUENTIAL,
  },
  strokeColorScaleData: {
    domain: [1, 100],
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.SEQUENTIAL,
  },
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
  highestViewableValue: 40,
  borderColor: 'grey',
}
${config3}
${config3_2}
${data3}
${data3_2}
${chart3}
`}
  ></ChartEditor>
)
