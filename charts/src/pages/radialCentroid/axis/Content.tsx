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
} from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 200,
}`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialCentroid.spokes({
  numberOfSpokes: 6,
  innerRadius: 10,
})
canvas.generate.radialCentroid.axis()`

const config2: string = `const config = {
  radius: 100,
  x: 50,
  y: 50,
  axisAngle: 45,
  gap: 40,
  strokeColor: 'black',
  textFont: QsEnumTextFont.VERDANA,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontSize: 8,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textStroke: 'red',
  textFill: 'black',
}`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialCentroid.spokes({
  numberOfSpokes: 6,
  innerRadius: 10,
})
canvas.generate.radialCentroid.axis(config)`

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
              Radial spokes in visualizations like radial charts or polar plots
              are not data-driven but serve as reference lines to enhance
              clarity. Radiating from the chart’s center, they mark consistent
              angular intervals (e.g., every 45° or π/4 radians), helping
              viewers interpret the angular distribution of data points. Spokes
              provide a visual grid, making it easier to track positions (e.g.,
              0°, 90°, 180°) and compare shapes, such as a radial area’s
              outline. Typically drawn to a fixed or maximum radius, they use
              subtle styling (e.g., light gray, dashed lines) to avoid
              overshadowing data, ensuring focus remains on the primary
              visualization while improving readability.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplied with only essential data, the spokes leverage
                    the library's default configuration parameters, such as
                    stroke color, width, and radius. By providing minimal data,
                    it defaults to preset styles, ensuring spokes radiate from
                    the center to a fixed or maximum radius. This simplifies
                    implementation, generating a set of spokes that supports the
                    primary data visualization without requiring extensive
                    customization.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAxisChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 180,
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
              Adjusting configuration parameters for radial spokes significantly
              alters their visual appearance, enabling customized and effective
              data visualizations. Parameters like stroke color, width and
              length can be modified to suit the chart’s aesthetic or functional
              needs. For instance, increasing stroke width or changing to a bold
              color enhances prominence, while dashed patterns create subtlety.
              Spoke length can be set to a fixed value or tied to the maximum
              data radius for context. Ensuring spokes complement the primary
              visualization, balancing clarity and style without overwhelming
              data.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Adding a radial axis for context this chart showcases how
                    configuration parameters, like stroke color and width can
                    transform radial spokes, this can be used to enhance the
                    clarity tailoring visualizations effectively.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAxisChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 180,
                    }}
                    config={{
                      radius: 100,
                      x: 50,
                      y: 50,
                      defaultAxisAngle: 30,
                      defaultGap: 9,
                      color: 'black',
                      defaultTextFont: QsEnumTextFont.VERDANA,
                      defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
                      defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
                      defaultTextFontSize: 5,
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

const axisConfig: string = `interface QsRadialAxisConfig {
  
}`

const axisConfigExample: string = `const config: QsRadialAreaConfig = {

}`

const config: string = `interface QsRadialAxisConfig {
  radius?: number
  x?: number
  y?: number
  axisAngle?: number
  gap?: number
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

const configExample: string = `const config: QsRadialAreaConfig = {
  radius: 100,
  x: 50,
  y: 50,
  axisAngle: 45,
  gap: 40,
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
  highestViewableValue: 25,
  borderColor: 'grey',
}
${config2}
${chart2}`}
  ></ChartEditor>
)
