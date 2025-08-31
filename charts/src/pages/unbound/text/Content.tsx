import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { UnboundTextChart } from './UnboundTextChart'
import { UnboundTextDefaultsChart } from './UnboundTextDefaultsChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 35,
}`

const defaultsChart: string = `
const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

const data: QsUnboundTextData[] = [
  { x: 10, y: 100, text: 'Text with no config uses defaults' },
]
canvas.generate.unbound.text(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

const configChart: string = `
const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

const data: QsUnboundTextData[] = [
  { x: 10, y: 100, text: 'Text with no config uses defaults' },
]
canvas.generate.unbound.text(data)

const data1: QsUnboundTextData[] = [
  { x: 0, y: 90, text: 'Three pieces of' },
  { x: 15, y: 80, text: 'text in one call' },
  { x: 30, y: 70, text: 'utilise on the same config' },
]

canvas.generate.unbound.text(data1, {
  defaultTextFont: QsEnumTextFont.FANTASY,
  defaultTextFontSize: 10,
  defaultTextFontStyle: QsEnumTextFontStyle.ITALIC,
  defaultTextStroke: 'red',
})

const data2: QsUnboundTextData[] = [
  { x: 0, y: 50, text: 'Text in separate call uses separate config' },
]
canvas.generate.unbound.text(data2, {
  defaultTextFont: QsEnumTextFont.HELVETICA,
  defaultTextFontSize: 7,
  defaultTextFontWeight: QsEnumTextFontWeight.BOLD,
  defaultTextFill: 'blue',
  defaultTextAngle: 10,
})
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

const data: string = `interface QsUnboundTextData {
  x: number,
  y: number,
  text: string
}`

const config: string = `interface QsUnboundTextConfig {
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

const dataExample: string = `const data: QsUnboundTextData = {
  x: 10,
  y: 20,
  text: 'hello world'
}`

const configExample: string = `const config: QsUnboundTextConfig = {
  defaultTextFont?: QsEnumTextFont.SANS_SERIF
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
            <UnboundTextDefaultsChart
              canvasConfig={{
                chartName: 'chartH',
                width: 600,
                highestViewableValue: 100,
                fillColor: 'lightBlue',
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
            <UnboundTextChart
              canvasConfig={{
                chartName: 'chartV',
                width: 600,
                highestViewableValue: 100,
                fillColor: 'lightBlue',
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
  highestViewableValue: 35,
  borderColor: 'grey',
}
${configChart}`}
  ></ChartEditor>
)
