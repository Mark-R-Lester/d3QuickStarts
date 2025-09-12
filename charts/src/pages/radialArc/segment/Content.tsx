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
import { RadialConfigChart } from './ArcSegmentChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import { QsEnumColorLightBlues } from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 156,
}`

const data1: string = `
const data: QsArcSegmentData[] =[
    { valueRad: 40 },
    { valueRad: 20 },
    { valueRad: 12 },
    { valueRad: 35 },
    { valueRad: 18 },
    { valueRad: 45 },
    { valueRad: 30 },
    { valueRad: 20 },
    { valueRad: 45 },
    { valueRad: 15 },
    { valueRad: 38 },
    { valueRad: 45 },
  ]`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialArc.segment(data)`

const config2: string = `
const config: QsArcSegmentConfig = {
  padding: 0,
  defaultFillColor: QsEnumColorLightBlues.AQUAMARINE,
  defaultFillOpacity: 0.2,
  defaultStrokeWidth: 0.2,
  defaultStrokeColor: QsEnumColorLightBlues.ROBINSEGG,
}`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialArc.segment(data, config)
canvas.generate.centroid.axis({
  defaultAxisAngle: 15,
  showCentralTick: false,
})
canvas.generate.radialArc.text.follow(
  [
    { value: 1, text: 'Apple' },
    { value: 1, text: 'Pear' },
    { value: 1, text: 'Plum' },
    { value: 1, text: 'Kiwi' },
    { value: 1, text: 'Mango' },
    { value: 1, text: 'Lime' },
    { value: 1, text: 'Fig' },
    { value: 1, text: 'Grape' },
    { value: 1, text: 'Lemon' },
    { value: 1, text: 'Peach' },
    { value: 1, text: 'Cherry' },
    { value: 1, text: 'Apricot' },
  ],
  {
    scaleType: QsEnumScaleType.BANDED,
    radius: 105,
    textFontSize: 7,
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
              Segments enable rose diagrams, also known as a Nightingale
              Segments in rose diagrams, also known as Nightingale diagrams,
              visually represent data using radial distance from the center.
              Each segment’s length reflects a data value, while its angular
              position denotes a category. Unlike pie charts, rose diagrams
              emphasize magnitude through radial extent, enabling intuitive
              comparisons. This format excels at displaying cyclic or
              directional data, such as wind patterns or temporal trends,
              providing a compact, aesthetically engaging visualization of
              datasets.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplying only essential data, the segments (or petals)
                    of a rose diagram utilize the library's default
                    configuration parameters. With each segment assigned an
                    equal angle. The angular position of each segment represents
                    a category, while its radial length or area reflects data
                    magnitude. These default settings, though functional,
                    produce a basic visualization, allowing for a clear yet
                    simple representation of cyclic or directional data, which
                    can be further customized to meet specific aesthetic or
                    analytical requirements.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialConfigChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 45,
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
              Customizing segments in rose diagrams enhances their visual and
              analytical impact. Configuration settings allow adjustments to
              segment attributes like color, opacity, and stroke style to
              highlight specific categories or improve readability. For
              instance, varying hues can differentiate data points, while
              thicker strokes emphasize key segments. Additionally, tweaking
              segment width or adding gradient fills can reflect data intensity,
              and incorporating labels provides precise values. These
              customizations transform the default, uniform segments into,
              tailored visualizations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This mock up rose diagram visualizes the consumption of 12
                    fruits, with each segment’s radial length representing the
                    amount consumed. Fill opacity is tailored to contrast with
                    bold stroke lines, enhancing visual distinction. Radial text
                    labels each segment, clearly displaying fruit names at their
                    angular positions for easy category identification. The
                    chart provides a simple, intuitive view of fruit consumption
                    patterns, effectively balancing aesthetics and clarity for
                    rapid data interpretation.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialConfigChart
                    canvasConfig={{
                      chartName: 'chart3',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 45,
                    }}
                    config={{
                      padding: 0,
                      defaultFillColor: QsEnumColorLightBlues.AQUAMARINE,
                      defaultFillOpacity: 0.2,
                      defaultStrokeWidth: 0.2,
                      defaultStrokeColor: QsEnumColorLightBlues.ROBINSEGG,
                    }}
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

const data: string = `interface QsArcSegmentData {
  valueArc?: never
  valueRad: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsArcSegmentConfig {
  layerType?: QsEnumLayerType.DATA
  outerRadius?: never
  innerRadius?: never
  padding?: number
  cornerRadius?: number
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

const dataExample: string = `const data: QsArcSegmentData = {
  valueRad: 20,
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsArcSegmentConfig = {
  layerType: QsEnumLayerType.DATA
  padding: 3,
  cornerRadius: 3,
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
  highestViewableValue: 45,
  borderColor: 'grey',
}
${config2}
${data1}
${chart2}`}
  ></ChartEditor>
)
