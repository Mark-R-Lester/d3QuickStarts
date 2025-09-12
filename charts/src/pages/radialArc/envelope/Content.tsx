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
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import { QsEnumColorLightBlues } from 'd3qs/d3QuickStart'
import { ArcEnvelopeChart } from './ArcEnvelopeChart'

const canvasConfig1: string = `const canvasConfig1 = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 45,
}`

const data1: string = `const data: QsArcEnvelopeData[] = [ 
  { valueArc: 20, valueRad: 45 },
  { valueArc: 60, valueRad: 20 },
  { valueArc: 20, valueRad: 40 },
  { valueArc: 15, valueRad: 30 },
  { valueArc: 10, valueRad: 20 },
  { valueArc: 20, valueRad: 45 },
  { valueArc: 15, valueRad: 30 },
  { valueArc: 10, valueRad: 45 },
  { valueArc: 15, valueRad: 30 },
]`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialArc.envelope(data)`

const canvasConfig2: string = `const canvasConfig2 = {
  chartName: 'ChartEditable',
  height: 400,
  width: 400,
  lowestViewableValue: 0,
  highestViewableValue: 100,
  fillColor: 'white',
}`

const config2: string = `const config: QsArcEnvelopeConfig = {
  padding: 0,
  defaultFillColor: QsEnumColorLightBlues.AQUAMARINE,
  defaultFillOpacity: 0.2,
  defaultStrokeWidth: 0.2,
  defaultStrokeColor: QsEnumColorLightBlues.ROBINSEGG,
}`

const data2: string = `const data: QsArcEnvelopeData[] = [ 
  { valueArc: 20, valueRad: 84, fillColor: 'orange' },
  { valueArc: 30, valueRad: 52 },
  { valueArc: 15, valueRad: 37, fillColor: 'red' },
]`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialArc.envelope(data, config)
canvas.generate.unbound.text([
  {
    x: 50,
    y: 95,
    textFontSize: 7,
    text: 'Passes made VS percent completed',
  },
])
canvas.generate.centroid.axis({
  defaultAxisAngle: 90,
  defaultTextFontSize: 5,
  showCentralTick: false,
})
canvas.generate.radialArc.text.follow(
  [
    { value: 20, text: 'Jones: 20' },
    { value: 30, text: 'Smith: 30' },
    { value: 15, text: 'Obi: 15' },
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
              Envelopes in data visualization extend two-dimensional
              representation by outlining hybrid charts that merge pie chart
              sectors with rose chart radial emphasis, where angular positions
              denote categories and envelope boundaries encapsulate data
              magnitudes. This approach proves useful for meaningful
              comparisons, as it highlights proportional differences through
              enclosed areas rather than mere slices, revealing insights at a
              glance. For instance, in football stats, an envelope could
              represent passes attempted along one axis and completions along
              another; a player with low attempts and low completions might show
              a narrow, contracted envelope, while one with balanced efficiency
              covers a larger, fuller area, enabling quick visual assessment of
              performance across teams or matches without complex calculations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Using default library settings, envelopes are generated with
                    a solid color and have a small gap between them, as can be
                    seen here. Of course in isolation it's not very useful.
                  </Typography>
                  <ContentCodeBox code={canvasConfig1} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <ArcEnvelopeChart
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
              Configuration settings govern envelope appearance, enabling
              precise customization of visual attributes such as color and
              stroke. By tailoring config and data parameters, envelopes can be
              styled to meet specific aesthetic requirements. Incorporating
              additional elements, such as axes and text annotations, enhances
              the visualization, providing meaningful context and clarity.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    The chart uses envelopes to visualize football stats, with
                    each envelope’s shape representing a player’s passes
                    attempted versus passes completed. Larger, fuller envelopes
                    indicate higher completion rates relative to attempts, while
                    shallower ones suggest inefficiency. Customizable colors and
                    stroke styles highlight individual players, enhancing visual
                    distinction. Axes provide scale, and text annotations label
                    key metrics, making performance trends immediately clear.
                    This intuitive design allows coaches and analysts to quickly
                    compare player effectiveness across matches, offering a
                    powerful tool for strategic insights in a compact, visually
                    engaging format.
                  </Typography>
                  <ContentCodeBox code={canvasConfig2} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <ArcEnvelopeChart
                    canvasConfig={{
                      chartName: 'chart2',
                      height: 400,
                      width: 400,
                      lowestViewableValue: 0,
                      highestViewableValue: 100,
                      fillColor: 'white',
                    }}
                    data={[
                      { valueArc: 20, valueRad: 84, fillColor: 'orange' },
                      { valueArc: 30, valueRad: 52 },
                      { valueArc: 15, valueRad: 37, fillColor: 'red' },
                    ]}
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

const data: string = `interface QsArcEnvelopeData {
  valueArc: number
  valueRad: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsArcEnvelopeConfig {
  layerType?: QsEnumLayerType
  innerRadius?: never
  innerRadius?: Never
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

const dataExample: string = `const data: QsArcEnvelopeData = {
  valueArc: 10
  valueRad: 10
  fillColor: 'blue'
  fillOpacity: 1
  strokeColor: 'blue',
  strokeWidth: 1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsArcEnvelopeConfig = {
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
  highestViewableValue: 100,
  borderColor: 'grey',
}
${config2}
${data2}
${chart2}`}
  ></ChartEditor>
)
