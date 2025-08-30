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
import { PlottedLineChart } from './PlottedLineChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import { QsEnumCurve, QsEnumLineCap, QsEnumLineJoin } from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  lowestViewableValueX: 0,
  highestViewableValueX: 180,
  lowestViewableValueY: 0,
  highestViewableValueY: 180,
}`

const lineConfig: string = `const config: QsPlottedLineData = {
  curve: QsEnumCurve.STEP,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 5,
  defaultStrokeOpacity: 1,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
}`

const LineData: string = `const data: QsPlottedLineData = {
  coordinates: [
    { x: 0, y: 0 },
    { x: 20, y: 30 },
    { x: 40, y: 26 },
    { x: 90, y: 15 },
    { x: 102, y: 112 },
    { x: 156, y: 140 },
  ],
}`

const LineDataComplex: string = `const data: QsPlottedLineData = {
  coordinates: [
    { x: 0, y: 10 },
    { x: 20, y: 30 },
    { x: 40, y: 26 },
    { x: 90, y: 15 },
    { x: 102, y: 112 },
    { x: 156, y: 140 },
  ],
  strokeOpacity: 1,
  strokeColor: 'red',
}`

const chart1: string = `const canvas: QsCanvasPlotted = qsCreateCanvasPlotted(canvasConfig)
canvas.generate.plotted.line(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

const chart2: string = `const canvas: QsCanvasPlotted = qsCreateCanvasPlotted(canvasConfig)
canvas.generate.plotted.line(data, config)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

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
              The line element renders data values as a continuous path,
              precisely drawn between points within the canvas's x, y coordinate
              system, ensuring smooth and accurate visualization of trends or
              relationships in the data.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplying only the essential data, the plotted line
                    element produces a visualization leveraging the library's
                    default configuration parameters
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={LineData} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <PlottedLineChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValueX: 0,
                      highestViewableValueX: 180,
                      lowestViewableValueY: 0,
                      highestViewableValueY: 180,
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
              Adjusting the configuration parameters or input data can
              substantially change the visual appearance of the line, enabling
              diverse and tailored data visualizations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This chart demonstrates the impact config and data can have
                    on the line.
                  </Typography>

                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={lineConfig} />
                  <ContentCodeBox code={LineDataComplex} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <PlottedLineChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValueX: 0,
                      highestViewableValueX: 180,
                      lowestViewableValueY: 0,
                      highestViewableValueY: 180,
                    }}
                    config={{
                      curve: QsEnumCurve.STEP,
                      defaultStrokeColor: 'blue',
                      defaultStrokeWidth: 5,
                      defaultStrokeOpacity: 1,
                      strokeLineJoin: QsEnumLineJoin.ROUND,
                      strokeLineCap: QsEnumLineCap.ROUND,
                    }}
                    data={{
                      coordinates: [
                        { x: 0, y: 10 },
                        { x: 20, y: 30 },
                        { x: 40, y: 26 },
                        { x: 90, y: 15 },
                        { x: 102, y: 112 },
                        { x: 156, y: 140 },
                      ],
                      strokeOpacity: 1,
                      strokeColor: 'red',
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
    { x: 0, y: 10 },
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
  defaultStrokeColor: 'blue',
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
  lowestViewableValueX: 0,
  highestViewableValueX: 180,
  lowestViewableValueY: 0,
  highestViewableValueY: 180,
  borderColor: 'grey',
}
${lineConfig}
${LineDataComplex}
${chart2}`}
  ></ChartEditor>
)
