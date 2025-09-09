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
import { RadialAxisChart } from './RadialAxisChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import {
  QsEnumTextFont,
  QsEnumTextFontWeight,
  QsEnumTextFontStyle,
  QsEnumTextDecorationLine,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumDataScale,
  QsEnumTickPosition,
} from 'd3qs/d3QuickStart'

const canvasConfig1: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 200,
}`

const canvasConfig2: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 240,
}`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.centroid.spokes({
  numberOfSpokes: 6,
  defaultInnerRadius: 10,
  defaultOuterRadius: 105,
})
canvas.generate.centroid.points(
  [
    { value: 50 },
    { value: 75 },
    { value: 100 },
    { value: 125 },
    { value: 150 },
    { value: 240 },
  ],
  { defaultRadius: 1.2 }
)
canvas.generate.centroid.axis()`

const config2: string = `const config = {
  x: 50,
  y: 50,
  defaultAxisAngle: 30,
  defaultGap: 9,
  color: 'black',
  numberOfRings: 4,
  showCentralTick: false,
  defaultTextFont: QsEnumTextFont.VERDANA,
  defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
  defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
  defaultTextFontSize: 6,
  defaultTextDecorationLine:
    QsEnumTextDecorationLine.NORMAL,
  defaultTextAlignmentBaseline:
    QsEnumAlignmentBaseline.MIDDLE,
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
  defaultTextFill: 'blue',
  ringConfig: [
    {
      strokeColor: 'red',
      ringNumber: 1,
      textFill: 'red',
    },
    {
      strokeColor: 'orange',
      ringNumber: 2,
      textFill: 'orange',
    },
    {
      strokeColor: 'orange',
      ringNumber: 3,
      textFill: 'orange',
    },
    {
      strokeColor: 'green',
      strokeWidth: 1,
      ringNumber: 4,
      textFill: 'green',
    },
  ],
}`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.centroid.spokes({
  numberOfSpokes: 6,
  defaultInnerRadius: 10,
  defaultOuterRadius: 105,
})
canvas.generate.centroid.points(
  [
    { value: 50 },
    { value: 75 },
    { value: 100 },
    { value: 125 },
    { value: 150 },
    { value: 240 },
  ],
  { defaultRadius: 1.2 }
)
canvas.generate.centroid.axis(config)`

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
              Concentric rings in radial charts or polar plots serve as
              reference lines, not data-driven elements, enhancing clarity.
              Positioned at fixed radial intervals from the center, they mark
              consistent distances (e.g., every 10 units), aiding in
              interpreting data magnitude. Each ring often includes a tick value
              at a gap, typically along a key angle (e.g., 0°), displaying
              numerical values (e.g., 10, 20, 30). Subtly styled (e.g., light
              gray, thin lines), rings avoid overshadowing data, ensuring focus
              on the visualization. They form a radial grid, simplifying
              magnitude comparisons and improving readability within a compact
              layout.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When provided with minimal data, the radial axis utilises
                    the library's default configuration, such as stroke color,
                    width. Tick values placed in a configurable gap , displays
                    numerical markers (e.g., 10, 20). This streamlined approach
                    simplifies implementation, producing a clear, unobtrusive
                    axis that supports the primary data visualization without
                    needing extensive customization, maintaining focus on the
                    data.
                  </Typography>
                  <ContentCodeBox code={canvasConfig1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAxisChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 200,
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
              Adjusting configuration parameters for the radial axis
              significantly alters its visual appearance, enabling customized
              and effective data visualizations. Parameters like stroke color,
              width, and ring intervals can be modified to suit the chart’s
              aesthetic or functional needs. For instance, increasing stroke
              width or using a bold color enhances prominence, while opacity
              creates subtlety. The number of rings can be set but this is more
              of a guide line when calculating ticks. Tick values are generated
              based on the lowestViewableValue, lowestViewableValue and
              numberOfRings. numberOfRings being more of a guideline that a
              defining value. This is due to the tick values produced being
              automatically adjusted to be well rounded values.
            </Typography>,
            <Typography variant="body1">
              Example: lowestViewableValue = 0, lowestViewableValue = 240 and
              numberOfRings = 5 resulting ticks = [50, 100, 150, 200]
            </Typography>,
            <Typography variant="body1">
              Example: lowestViewableValue = 0, lowestViewableValue = 250 and
              numberOfRings = 5 resulting ticks = [50, 100, 150, 200, 250]
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This chart illustrates how configuration parameters can
                    transform a radial axis, enhancing its visual impact and
                    functionality in radial charts or polar plots. Adjusting
                    stroke color, width, and ring intervals allows customization
                    to align with the chart’s aesthetic or data needs. For
                    example, a bold color or thicker stroke increases axis
                    prominence, while subtle opacity ensures it complements the
                    data. Tick values, placed in configurable gaps (e.g., at
                    0°), display clear numerical markers (e.g., 10, 20). These
                    adjustments create a balanced, readable radial axis,
                    supporting effective data visualization without
                    overshadowing the primary data.
                  </Typography>
                  <ContentCodeBox code={canvasConfig2} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAxisChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 10,
                      highestViewableValue: 240,
                      dataScale: { scale: QsEnumDataScale.LINEAR },
                    }}
                    config={{
                      x: 50,
                      y: 50,
                      defaultAxisAngle: 30,
                      defaultGap: 9,
                      color: 'black',
                      numberOfTicks: 5,
                      showCentralTick: false,
                      defaultTextFont: QsEnumTextFont.VERDANA,
                      defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
                      defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
                      defaultTextFontSize: 6,
                      defaultTextDecorationLine:
                        QsEnumTextDecorationLine.NORMAL,
                      defaultTextAlignmentBaseline:
                        QsEnumAlignmentBaseline.MIDDLE,
                      defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
                      defaultTextFill: 'blue',
                      tickConfig: [
                        {
                          strokeColor: 'red',
                          tickPosition: QsEnumTickPosition.CORE,
                          textFill: 'red',
                        },
                        {
                          strokeColor: 'orange',
                          tickPosition: QsEnumTickPosition.INTERMEDIATE,
                          textFill: 'orange',
                        },
                        {
                          strokeColor: 'green',
                          strokeWidth: 1,
                          tickPosition: QsEnumTickPosition.PERIMETER,
                          textFill: 'green',
                        },
                      ],
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

const axisConfig: string = `interface QsRingConfig  {
  ringNumber: number
  axisAngle?: number
  gap?: number
  decimalPlaces?: number

  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number

  textFont?: QsEnumTextFont | string
  textFontSize?: number
  textFontStyle?: QsEnumTextFontStyle
  textFontWeight?: QsEnumTextFontWeight | number
  textDecorationLine?: QsEnumTextDecorationLine
  textFill?: string
  textAnchor?: QsEnumTextAnchor
  textStroke?: string
  textAlignmentBaseline?: QsEnumAlignmentBaseline
}`

const axisConfigExample: string = `const config: QsCentroidAreaConfig = {
  ringNumber: 1
  axisAngle: 45
  gap: 9
  decimalPlaces: 1

  strokeColor: 'black',
  strokeWidth: 1,
  strokeOpacity: 1,

  textFont: QsEnumTextFont.VERDANA,
  textFontSize: 8,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textFill: 'black',
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textStroke: 'red',
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
}`

const config: string = `interface QsRadialAxisConfig {
  useDataArea?: boolean
  showCentralTick?: boolean
  ringConfig?: QsRingConfig[]
  x?: number
  y?: number
  defaultAxisAngle?: number
  defaultGap?: number
  numberOfRings?: number
  decimalPlaces?: number

  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number

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

const configExample: string = `const config: QsCentroidAreaConfig = {
  useDataArea: true
  showCentralTick?: true
  ringConfig: ringConfig: [
    {
      strokeColor: 'red',
      ringNumber: 1,
      textFill: 'red',
    },
    {
      strokeColor: 'orange',
      ringNumber: 2,
      textFill: 'orange',
    },
  ],
  x: 50
  y: 50
  defaultAxisAngle: 45
  defaultGap: 9
  numberOfRings: 5
  decimalPlaces: 0

  defaultStrokeColor: 'red'
  defaultStrokeWidth: 1
  defaultStrokeOpacity: 1

  defaultTextFont: QsEnumTextFont.SERIF,
  defaultTextFontSize: GlobalDefaultSettings.FONT_SIZE,
  defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
  defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
  defaultTextDecorationLine: QsEnumTextDecorationLine.NORMAL,
  defaultTextFill: GlobalDefaultColors.TEXT_FILL_COLOR,
  defaultTextAngle: 0,
  defaultTextStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
  defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
 
}`

export const configAndData: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,
      <ContentBox>
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
                  <ContentCodeBox code={axisConfig} />
                </ContentTextBox>,
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Example
                  </Typography>
                  <ContentCodeBox code={axisConfigExample} />
                </ContentTextBox>,
              ]}
            />,
          ]}
        />

        <ContentColumn
          elements={[
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
  highestViewableValue: 200,
  borderColor: 'grey',
}
${config2}
${chart2}`}
  ></ChartEditor>
)
