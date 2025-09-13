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
import { ArcTextChart } from './ArcTextChart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 156,
  borderColor: 'grey',
}`

const data1: string = `const data: QsArcTextData[] = [
  { value: 10, text: 'Ten' },
  { value: 20, text: 'Twenty' },
  { value: 30, text: 'Thirty' },
  { value: 40, text: 'Forty' },
  { value: 50, text: 'Fifty' },
]`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.arc.text.follow(data)`

const config2: string = `const config: QsArcTextConfig = {  }`

const data2: string = `const data: QsArcTextData[] = [
  { value: 10, text: 'Ten' },
  { value: 20, text: 'Twenty' },
  { value: 30, text: 'Thirty' },
  { value: 40, text: 'Forty' },
  { value: 50, text: 'Fifty' },
]`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.arc.text.follow(data, config)`

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
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <ArcTextChart
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
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <ArcTextChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      highestViewableValue: 100,
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
const data: string = `interface QsPlottedLineData {
  coordinates: QsCoordinate[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}`

const config: string = `interface QsLinePlotConfig {
  curve?: QsEnumCurve
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  strokeLineJoin?: QsEnumLineJoin
  strokeLineCap?: QsEnumLineCap
}`

const dataExample: string = `const data: QsPlottedLineData = {
  coordinates: [
    { x: 15, y: 10 },
    { x: 20, y: 30 },
    { x: 40, y: 26 },
    { x: 90, y: 15 },
    { x: 102, y: 112 },
    { x: 156, y: 140 },
  ],
  strokeOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 1,
}`

const configExample: string = `const config: QsLinePlotConfig = {
  curve: QsEnumCurve.NATURAL,
  defaultStrokeColor: 'blue'
  defaultStrokeWidth: 1,
  defaultStrokeOpacity: 1,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
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
  highestViewableValue: 156,
  borderColor: 'grey',
}
${chart2}`}
  ></ChartEditor>
)
