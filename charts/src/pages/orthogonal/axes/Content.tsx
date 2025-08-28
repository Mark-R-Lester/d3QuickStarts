import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import {
  ContentTitle,
  ContentBox,
  ContentTextBox,
  ContentChartBox,
} from '../../../components/atoms/content/ContentStyled'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import { OrthogonalAxisChart } from './AxisConfigChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import {
  QsAxisConfig,
  QsEnumAlignmentBaseline,
  QsEnumAxisScaleType,
  QsEnumDataScale,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'chart',
  width: 600,
  highestViewableValue: 190,
}`

const getConfigHString = (scaleType: string): string => `const configH ={
  tickSizeInner: 0,
  tickSizeOuter: 0,
  tickPadding: 0,
  domainWidth: 3,
  domainOpacity: 1,
  scale: {
    type: QsEnumAxisScaleType.${scaleType},
    domain: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
  },
  percentageMovement: 0,
  textFont: QsEnumTextFont.SERIF,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontSize: 6,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textAngle: 90,
  textAlignmentBaseline: QsEnumAlignmentBaseline.BASELINE,
  textAnchor: QsEnumTextAnchor.START,
  textX: 0,
  textY: 3,
}`

const getConfigH = (scaleType: QsEnumAxisScaleType): QsAxisConfig => ({
  tickSizeInner: 0,
  tickSizeOuter: 0,
  tickPadding: 0,
  domainWidth: 3,
  domainOpacity: 1,
  scale: {
    type: scaleType,
    domain: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
  },
  percentageMovement: 0,
  textFont: QsEnumTextFont.SERIF,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontSize: 6,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textAngle: 90,
  textAlignmentBaseline: QsEnumAlignmentBaseline.BASELINE,
  textAnchor: QsEnumTextAnchor.START,
  textX: 0,
  textY: 3,
})

const configV: string = `const configV = {
  tickSizeInner: -100,
  tickSizeOuter: 1,
  tickPadding: 2,
  tickColor: 'lightgrey',
  domainWidth: 3,
  numberOfTicks: 10,
  domainOpacity: 1,
  percentageMovement: 0,
  textFont: QsEnumTextFont.SERIF,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textFontStyle: QsEnumTextFontStyle.ITALIC,
  textFontSize: 3,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textAngle: 0,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
  textAnchor: QsEnumTextAnchor.END,
  textX: 0,
  textY: 0,
}`

const getConfigV = (): QsAxisConfig => ({
  tickSizeInner: -100,
  tickSizeOuter: 1,
  tickPadding: 2,
  tickColor: 'lightgrey',
  domainWidth: 3,
  numberOfTicks: 10,
  domainOpacity: 1,
  percentageMovement: 0,
  textFont: QsEnumTextFont.SERIF,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textFontStyle: QsEnumTextFontStyle.ITALIC,
  textFontSize: 3,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textAngle: 0,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
  textAnchor: QsEnumTextAnchor.END,
  textX: 0,
  textY: 0,
})

const defaultsChart: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

const bandedChart: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
  canvas.generate.orthogonal.horizontal.bars([
    { highValue: 20 },
    { highValue: 40 },
    { highValue: 80 },
    { highValue: 100 },
    { highValue: 120 },
    { highValue: 160 },
    { highValue: 180 },
  ])
  canvas.generate.orthogonal.vertical.axis.left(configV)
  canvas.generate.orthogonal.horizontal.axis.bottom(configH)
}`

const pointChart: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
  canvas.generate.orthogonal.horizontal.line({
    values: [20, 40, 80, 100, 120, 160, 180],
  })
  canvas.generate.orthogonal.vertical.axis.left(configV)
  canvas.generate.orthogonal.horizontal.axis.bottom(configH)
}`

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
              Orthogonal axes visually represent the coordinate system of a
              chart, with two perpendicular lines (typically x and y) that
              define the scale and position of data points, enabling accurate
              mapping and interpretation of data values within the chart's
              framework.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When no configuration is provided, the OrthogonalAxis
                    element generates a visualization using the library's
                    default configuration settings. It creates a linear axis,
                    leveraging the canvas's lowestViewableValue and
                    highestViewableValue to calculate values, ensuring a precise
                    aligment with data elements
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={defaultsChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalAxisChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 190,
                      dataScale: { scale: QsEnumDataScale.LINEAR },
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
              Using config to modify appearance
            </Typography>,
            <Typography variant="body1">
              Modifying the configuration parameters allows for significant
              customization of the orthogonal axes' visual appearance, enabling
              precise alignment and styling to complement the data visualization
              elements within the chart.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    The orthogonal axes can be configured to align seamlessly
                    with bars or other banded content, ensuring precise
                    positioning and visual harmony by tailoring the axis scale,
                    spacing, and styling to complement the data visualization
                    elements within the chart.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    BANDED
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={configV} />
                  <ContentCodeBox code={getConfigHString('BANDED')} />
                  <ContentCodeBox code={bandedChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalAxisChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 190,
                    }}
                    configH={getConfigH(QsEnumAxisScaleType.BANDED)}
                    configV={getConfigV()}
                  />
                </ContentChartBox>,
              ]}
            />,
          ]}
        />

        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1" gutterBottom>
                    POINT
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={configV} />
                  <ContentCodeBox code={getConfigHString('POINT')} />
                  <ContentCodeBox code={pointChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalAxisChart
                    canvasConfig={{
                      chartName: 'chart3',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 190,
                    }}
                    configH={getConfigH(QsEnumAxisScaleType.POINT)}
                    configV={getConfigV()}
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

const config: string = `export interface QsAxisConfig {
  percentageMovement?: number

  domainColor?: string
  domainOpacity?: number
  domainWidth?: number
  domainScale?: QsEnumAxisScaleType
  tickColor?: string
  tickOpacity?: number
  tickWidth?: number
  tickSizeInner?: number
  tickSizeOuter?: number
  tickPadding?: number
  numberOfTicks?: number

  textFont?: QsEnumTextFont | string
  textFontSize?: number
  textFontStyle?: QsEnumTextFontStyle
  textFontWeight?: QsEnumTextFontWeight | number
  textDecorationLine?: QsEnumTextDecorationLine
  textFill?: string
  textAngle?: number
  textAnchor?: QsEnumTextAnchor
  textStroke?: string
  textAlignmentBaseline?: QsEnumAlignmentBaseline
  textX?: number
  textY?: number
}`

const configExample: string = `const axisConfig: QsAxisConfig = {
  percentageMovement: 0,

  domainColor: 'blue',
  domainOpacity: 1,
  domainWidth: 3,
  scale: {
    type: QsEnumAxisScaleType.BANDED,
    domain: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
  }
  tickColor:'blue',
  tickOpacity: 1,
  tickWidth: 1,
  tickSizeInner: 2,
  tickSizeOuter: 0,
  tickPadding: 0,
  numberOfTicks: 10,
  
  textFont: QsEnumTextFont.SERIF,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontSize: 6,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textAngle: 90,
  textAlignmentBaseline: QsEnumAlignmentBaseline.BASELINE,
  textAnchor: QsEnumTextAnchor.START,
  textStroke: 'blue',
  textFill: 'green',
  textX: 20,
  textY: 0,
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
                    QsAreaConfig interface
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
    highestViewableValue: 190,
    marginBottom: 20,
    borderColor: 'grey',
  }
${configV}
${getConfigHString('BANDED')}
${bandedChart}`}
  />
)
