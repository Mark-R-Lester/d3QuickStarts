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
import { PlottedPointsChart } from './PlottedPointsChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  lowestViewableValueX: 0,
  highestViewableValueX: 180,
  lowestViewableValueY: 0,
  highestViewableValueY: 180,
}`

const pointData: string = `const data: QsPlottedPointsData[] = [
  { x: 15, y: 10 },
  { x: 20, y: 30 },
  { x: 40, y: 26 },
  { x: 90, y: 15 },
  { x: 102, y: 112 },
  { x: 156, y: 140 },
]`

const pointDataComplex: string = `const data: QsPlottedPointsData[] = [
  {
    x: 15,
    y: 10,
    radius: 10,
    fillOpacity: 0.1,
  },
  { x: 20, y: 30, radius: 5, fillOpacity: 0.1 },
  { x: 40, y: 26, radius: 30, fillOpacity: 0.1 },
  { x: 90, y: 15, radius: 20, fillOpacity: 0.1 },
  {
    x: 102,
    y: 112,
    radius: 30,
    fillOpacity: 0.1,
    fillColor: 'red',
    strokeWidth: 1,
    strokeColor: 'blue',
  },
  { x: 156, y: 140, radius: 15, fillOpacity: 0.1 },
]`

const pointConfig: string = `const config: QsPlottedPointsConfig = {
  defaultRadius: 2,
  defaultFillColor: 'blue',
  defaultFillOpacity: 1,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 1,
  defaultStrokeOpacity: 1,
}`

const chart1: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasPlotted(canvasConfig)
canvas.generate.plotted.points(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

const chart2: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasPlotted(canvasConfig)
canvas.generate.plotted.points(data)
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
              Plotted points are ideal for scatter plots, representing data
              values as individual markers precisely positioned within an x, y
              coordinate system on the canvas. Each point’s size and placement
              accurately reflect the data’s values, enabling clear visualization
              of patterns, clusters, or outliers. Perfect for displaying
              relationships or distributions, plotted points offer flexibility
              in styling, such as color or size, to enhance clarity. Their
              precise scaling ensures effective data communication, making them
              a powerful tool for exploratory analysis or highlighting trends in
              datasets, all while maintaining a clean and intuitive visual
              representation within the scatter plot.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplying only the essential data, plotted points
                    produces a visualization leveraging the library's default
                    configuration parameters
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={pointData} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <PlottedPointsChart
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
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Adjusting the configuration and data can substantially
                    change the visual appearance of plotted points, enabling
                    diverse and tailored data visualizations.
                  </Typography>

                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={pointConfig} />
                  <ContentCodeBox code={pointDataComplex} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <PlottedPointsChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValueX: 0,
                      highestViewableValueX: 180,
                      lowestViewableValueY: 0,
                      highestViewableValueY: 180,
                    }}
                    config={{
                      defaultRadius: 2,
                      defaultFillColor: 'blue',
                      defaultFillOpacity: 1,
                      defaultStrokeColor: 'blue',
                      defaultStrokeWidth: 1,
                      defaultStrokeOpacity: 1,
                    }}
                    data={[
                      {
                        x: 15,
                        y: 10,
                        radius: 10,
                        fillOpacity: 0.1,
                      },
                      { x: 20, y: 30, radius: 5, fillOpacity: 0.1 },
                      { x: 40, y: 26, radius: 30, fillOpacity: 0.1 },
                      { x: 90, y: 15, radius: 20, fillOpacity: 0.1 },
                      {
                        x: 102,
                        y: 112,
                        radius: 30,
                        fillOpacity: 0.1,
                        fillColor: 'red',
                        strokeWidth: 1,
                        strokeColor: 'blue',
                      },
                      { x: 156, y: 140, radius: 15, fillOpacity: 0.1 },
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

const data: string = `interface QsPlottedPointsData {
  x: number
  y: number
  radius?: number
  opacity?: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsPlottedPointsConfig {
  defaultRadius?: number
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
}`

const dataExample: string = `const data: QsPlottedPointsData = {
  x: 10,
  y: 20,
  radius: 3,
  opacity: 1,
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 3,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsPlottedPointsConfig = {
  defaultRadius: 2,
  defaultFillColor: 'blue',
  defaultFillOpacity: 1,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 1,
  defaultStrokeOpacity: 1,
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
${pointConfig}
${pointDataComplex}
${chart1}`}
  ></ChartEditor>
)
