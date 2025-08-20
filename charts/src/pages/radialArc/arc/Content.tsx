import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { RadialDefaultsChart } from './RadialDefaultsChart'
import { RadialConfigChart } from './RadialConfigChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 156,
}`

const defaultsChart: string = `
const data: QsRadialData[] = [
  { value: 15 },
  { value: 45 },
  { value: 60 },
  { value: 15 },
]

const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialArc.radial(data)`

const configChart: string = `
const data: QsRadialData[] = [
  {
    value: 1,
    fillColor: 'salmon',
    fillOpacity: 0.5,
    strokeWidth: 1,
    strokeColor: 'grey',
  },
  { value: 1, fillColor: 'salmon' },
  { value: 1, fillColor: 'hotpink' },
  { value: 1, fillColor: 'hotpink' },
  { value: 1, fillColor: 'maroon' },
  { value: 1, fillColor: 'darksalmon' },
  { value: 1, fillColor: 'brown' },
  { value: 1, fillColor: 'purple' },
  { value: 1, fillColor: 'salmon' },
]

const config: QsRadialConfig = {
  outerRadius: 90,
  innerRadius: 50,
  padding: 0.03,
}

const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialArc.radial(data, config)`

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

const data: string = `interface QsRadialData {
  value: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsRadialConfig {
  outerRadius?: number
  innerRadius?: number
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

const dataExample: string = `const data: QsRadialData = {
  value: 20,
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsRadialConfig = {
  outerRadius: 90,
  innerRadius: 0,
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
            <RadialDefaultsChart
              canvasProps={{
                chartName: 'chartH',
                width: 600,
                highestViewableValue: 156,
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
            <RadialConfigChart
              canvasProps={{
                chartName: 'chartV',
                width: 600,
                lowestViewableValue: 0,
                highestViewableValue: 156,
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
