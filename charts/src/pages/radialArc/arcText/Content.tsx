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
import { ArcTextAllChart } from './ArcTextAllChart'
import {
  QsEnumArcTextAngularPosition,
  QsEnumTextAnchor,
  QsEnumTextFont,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 20,
  borderColor: 'grey',
}`

const config1: string = `const config1: QsArcTextConfig = {
  defaultRadius: 98,
}
const config2: QsArcTextConfig = {
  defaultRadius: 120,
}
const config3: QsArcTextConfig = {
  defaultRadius: 60,
}
const config4: QsArcTextConfig = {
  defaultRadius: 88,
}`

const data1: string = `const data1: QsArcTextData[] = [
  { value: 1, text: 'following the arc' },
  { value: 1, text: 'following the arc' },
  { value: 1, text: 'following the arc' },
  { value: 1, text: 'following the arc' },
  { value: 1, text: 'following the arc' },
]
const data2: QsArcTextData[] = [
  { value: 1, text: 'spokes' },
  { value: 1, text: 'spokes' },
  { value: 1, text: 'spokes' },
  { value: 1, text: 'spokes' },
  { value: 1, text: 'spokes' },
]
const data3: QsArcTextData[] = [
  { value: 1, text: 'horizontal' },
  { value: 1, text: 'horizontal' },
  { value: 1, text: 'horizontal' },
  { value: 1, text: 'horizontal' },
  { value: 1, text: 'horizontal' },
]
const data4: QsArcTextData[] = [
  { value: 1, text: 'rotated' },
  { value: 1, text: 'rotated' },
  { value: 1, text: 'rotated' },
  { value: 1, text: 'rotated' },
  { value: 1, text: 'rotated' },
]`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.arc.text.follow(data1, config1)
canvas.generate.arc.text.spokes(data2, config2)
canvas.generate.arc.text.horizontal(data3, config3)
canvas.generate.arc.text.rotated(data4, config4)`

const config2: string = `const config1: QsArcTextConfig = {
  angularPosition: QsEnumArcTextAngularPosition.OFFSET_BANDED,
  defaultRadius: 60,
  defaultDecimalPoints: 0,
  defaultTextFont: QsEnumTextFont.BRUSH_SCRIPT_MT,
  defaultTextFontSize: 15,
  defaultTextFontWeight: QsEnumTextFontWeight.LIGTHER,
  defaultTextFill: 'white',
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
}
const config2: QsArcTextConfig = {
  defaultRadius: 108,
  defaultTextFontSize: 6,
}`

const data2: string = `const data1: QsArcTextData[] = [
  { value: 10 },
  { value: 15 },
  { value: 10 },
  { value: 15 },
  { value: 20 },
]
const data2: QsArcTextData[] = [
  { value: 10, text: 'Orange' },
  { value: 15, text: 'Mango' },
  { value: 10, text: 'Banana' },
  { value: 15, text: 'Rasberry' },
  { value: 20, text: 'Plum' },
]`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.arc.slice([
  { valueArc: 10 },
  { valueArc: 15 },
  { valueArc: 10 },
  { valueArc: 15 },
  { valueArc: 20 },
])
canvas.generate.arc.text.horizontal(data1, config1)
canvas.generate.arc.text.follow(data2, config2)`

const config4: string = `const config1: QsArcTextConfig = { 
  angularPosition: QsEnumArcTextAngularPosition.POINT,
  defaultDecimalPoints: 2,
  defaultRadius: 110, 
}`

const data4: string = `const data1: QsArcTextData[] = [
  {
    value: 10,
    textFont: QsEnumTextFont.IMPACT,
    textFontSize: 5,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textFill: 'orange',
  },
  { value: 15 },
  { value: 10 },
  { value: 15 },
  { value: 20 },
]`

const chart4: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.centroid.area({ highValues: [10, 15, 10, 15, 20] })
canvas.generate.centroid.spokes({ numberOfSpokes: 5 })
canvas.generate.arc.text.follow(data1, config1)`

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
              Radial text enhances data visualization in radial charts, such as
              pie charts, by positioning text at calculated angular intervals
              that align with the data, improving readability and visual
              coherence. Both representative values, or plain text for
              categories make used ensuring clarity. Precise angular placement
              ensures intuitive, space-efficient labeling, avoids overlap in
              dense charts, and enhances clarity, engagement, and the overall
              effectiveness of data communication.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    The four radial text orientations— spoke, follow, horizontal
                    and rotated offer distinct visual arrangements, each
                    providing unique aesthetic and functional impacts.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config1} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <ArcTextAllChart
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
              Configuration settings control arc text appearance, allowing
              precise customization of visual attributes like font, color, and
              orientation. By adjusting config and data parameters, arc text can
              be styled to meet specific aesthetic needs.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This demo showcases various configuration parameters for arc
                    text, enabling customization of attributes like radius,
                    position, font, size, style, weight, decoration, fill,
                    stroke, anchor, and alignment. These settings allow precise
                    styling to meet specific aesthetic and functional
                    requirements.
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
                    config1={{
                      angularPosition:
                        QsEnumArcTextAngularPosition.OFFSET_BANDED,
                      defaultRadius: 60,
                      defaultDecimalPoints: 0,
                      defaultTextFont: QsEnumTextFont.BRUSH_SCRIPT_MT,
                      defaultTextFontSize: 15,
                      defaultTextFontWeight: QsEnumTextFontWeight.LIGTHER,
                      defaultTextFill: 'white',
                      defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
                    }}
                    data2={[
                      { value: 10, text: 'Orange' },
                      { value: 15, text: 'Mango' },
                      { value: 10, text: 'Banana' },
                      { value: 15, text: 'Rasberry' },
                      { value: 20, text: 'Plum' },
                    ]}
                    config2={{
                      defaultRadius: 108,
                      defaultTextFontSize: 6,
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This demo highlights the use data parameters for individual
                    arc text data points, also allowing customization of
                    attributes like font, size, style, weight, decoration, fill,
                    stroke, anchor, and alignment.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config4} />
                  <ContentCodeBox code={data4} />
                  <ContentCodeBox code={chart4} />
                </ContentTextBox>,
                <ContentChartBox>
                  <ArcTextChart
                    canvasConfig={{
                      chartName: 'chart4',
                      width: 600,
                      highestViewableValue: 20,
                    }}
                    config1={{
                      angularPosition: QsEnumArcTextAngularPosition.POINT,
                      defaultDecimalPoints: 2,
                      radius: 110,
                    }}
                    data1={[
                      {
                        value: 10,
                        textFont: QsEnumTextFont.IMPACT,
                        textFontSize: 5,
                        textFontWeight: QsEnumTextFontWeight.NORMAL,
                        textFill: 'orange',
                      },
                      { value: 15 },
                      { value: 10 },
                      { value: 15 },
                      { value: 20 },
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
const data: string = `interface QsArcTextData {
  value: number
  text?: string
  decimalPoints?: number
  textAngle?: never
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

const config: string = `interface ArcTextConfig {
  layerType?: QsEnumLayerType
  defaultRadius?: number
  x?: number
  y?: number
  radialPosition?: QsEnumArcTextRadialPosition
  defaultDecimalPoints?: number
  defaultTextAngle?: never
  defaultTextFont?: QsEnumTextFont | string
  defaultTextFontSize?: number
  defaultTextFontStyle?: QsEnumTextFontStyle
  defaultTextFontWeight?: QsEnumTextFontWeight | number
  defaultTextDecorationLine?: QsEnumTextDecorationLine
  defaultTextFill?: string
  defaultTextAnchor?: QsEnumTextAnchor
  defaultTextStroke?: string
  defaultTextAlignmentBaseline?: QsEnumAlignmentBaseline
}`

const dataExample: string = `const data: QsArcTextData = {
  value: 10
  text: 'great number'
  decimalPoints: 1
  textFont: QsEnumTextFont.SERIF,
  textFontSize: GlobalDefaultSettings.FONT_SIZE,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textFill: GlobalDefaultColors.TEXT_FILL_COLOR,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
  textAlignmentBaseline: QsEnumAlignmentBaseline.AUTO,
}`

const configExample: string = `const config: ArcTextConfig = {
  defaultRadius: 105
  x: 50
  y: 50
  angularPosition: QsEnumArcTextAngularPosition.OFFSET_BANDED,
  defaultDecimalPoints: GlobalDefaultSettings.DECIMAL_POINTS,
  defaultTextFont: QsEnumTextFont.SERIF,
  defaultTextFontSize: GlobalDefaultSettings.FONT_SIZE,
  defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
  defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
  defaultTextDecorationLine: QsEnumTextDecorationLine.NORMAL,
  defaultTextFill: GlobalDefaultColors.TEXT_FILL_COLOR,
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
  defaultTextStroke: GlobalDefaultColors.TEXT_STROKE_COLOR,
  defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.AUTO,
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
  highestViewableValue: 20,
  borderColor: 'grey',
}
${config4}
${data4}
${chart4}`}
  ></ChartEditor>
)
