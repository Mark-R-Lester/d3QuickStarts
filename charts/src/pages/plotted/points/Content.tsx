import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { PlottedPointsDefaultsChart } from './PlottedPointsDefaultsChart'
import { PlottedPointsChart } from './PlottedPointsChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 156,
}`

const defaultsChart: string = `
const data: QsPlottedPointData[] = [
  { x: 15, y: 10 },
  { x: 20, y: 30 },
  { x: 40, y: 26 },
  { x: 90, y: 15 },
  { x: 102, y: 112 },
  { x: 156, y: 140 },
]

const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.plotted.points(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

const configChart: string = `
const data: QsPlottedPointData[] = [
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
]

const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.plotted.points(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

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

export const defaultsContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Text generated with defaults</ContentTitle>,
      <ContentBox>
        <Typography variant="body1">content</Typography>
      </ContentBox>,
      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">content</Typography>
                  <Typography variant="body1">content</Typography>
                </ContentTextBox>,
                <ContentCodeBox code={defaultsChartAll} />,
              ]}
            />,
            <PlottedPointsDefaultsChart
              canvasProps={{
                chartName: 'chartH',
                width: 600,
                highestViewableValueX: 156,
                highestViewableValueY: 156,
              }}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

export const configContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Text customised</ContentTitle>,
      <ContentBox>
        <Typography variant="body1">content</Typography>
      </ContentBox>,

      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">content</Typography>
                  <Typography variant="body1">content</Typography>
                </ContentTextBox>,
                <ContentCodeBox code={configChartAll} />,
              ]}
            />,
            <PlottedPointsChart
              canvasProps={{
                chartName: 'chartV',
                width: 600,
                highestViewableValueX: 156,
                highestViewableValueY: 156,
              }}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

export const configAndData: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">QsTextData interface</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">Interface:</Typography>,
                <ContentCodeBox code={data} />,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentCodeBox code={dataExample} />,
              ]}
            />,
          ]}
        />
      </ContentBox>,
      <ContentTitle variant="h4">QsTextConfig interface</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">interface:</Typography>,
                <ContentCodeBox code={config} />,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentCodeBox code={configExample} />,
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
${configChart}`}
  ></ChartEditor>
)
