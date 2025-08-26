import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { RadialTextDefaultsChart } from './RadialTextDefaultsChart'
import { RadialTextConfigChart } from './RadialTextConfigChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 156,
  borderColor: 'grey',
}`

const defaultsChart: string = `
 const data: QsValuedText[] = [
  { value: 10, text: 'Ten' },
  { value: 20, text: 'Twenty' },
  { value: 30, text: 'Thirty' },
  { value: 40, text: 'Forty' },
  { value: 50, text: 'Fifty' },
]

const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialArc.text.follow(data)`

const configChart: string = `
  const data: QsValuedText[] = [
    { value: 10, text: 'Ten' },
    { value: 20, text: 'Twenty' },
    { value: 30, text: 'Thirty' },
    { value: 40, text: 'Forty' },
    { value: 50, text: 'Fifty' },
  ]

  const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
  canvas.generate.radialArc.text.follow(data, {
    radius: 100,
    x: 50,
    y: 50,
    textFont: QsEnumTextFont.ARIAL,
    textFontSize: 6,
    textFontStyle: QsEnumTextFontStyle.ITALIC,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textDecorationLine: QsEnumTextDecorationLine.OVERLINE_UNDERLINE,
    textFill: 'orange',
    textStroke: 'purple',
    textAnchor: QsEnumTextAnchor.MIDDLE,
  })`

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

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
            <RadialTextDefaultsChart
              canvasConfig={{
                chartName: 'chartH',
                width: 600,
                highestViewableValue: 156,
                borderColor: 'grey',
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
            <RadialTextConfigChart
              canvasConfig={{
                chartName: 'chartV',
                width: 600,
                lowestViewableValue: 0,
                highestViewableValue: 156,
                borderColor: 'grey',
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
