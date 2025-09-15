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
import { RadialTextChart } from './TextChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 2,
  borderColor: 'grey',
}`

const config1: string = `const config: QsArcTextData = {}`

const data1: string = `const data: QsArcTextData[] = [
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 2 },
]`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.centroid.text(data)`

const configChart: string = `
const data: QsArcTextData[] = [
  { value: 1,},
  { value: 2 },
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 2 },
]

const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.centroid.text(data)`

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
                  <RadialTextChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 2,
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
                  <ContentCodeBox code={config1} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialTextChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      highestViewableValue: 2,
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
                  <ContentCodeBox code={config1} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialTextChart
                    canvasConfig={{
                      chartName: 'chart4',
                      width: 600,
                      highestViewableValue: 2,
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

const data: string = `interface QsArcTextData {
  value: number
  text?: string
  textFont?: QsEnumTextFont | string
  textFontSize?: number
  textFontStyle?: QsEnumTextFontStyle
  textFontWeight?: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill?: string
  textAngle?: number
  textAnchor?: QsEnumTextAnchor
  textStroke?: string
  textAlignmentBaseline?: QsEnumAlignmentBaseline
}`

const config: string = `interface QsRadialTextConfig = {
  useDataArea?: boolean
  x?: number
  y?: number
  defaultDecimalPoints?: number
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

const dataExample: string = `const data: QsArcTextData = {
  value: 27,
  text: 'this is what you will see if added',
  textFont: QsEnumTextFont.SERIF,
  textFontSize: 10,
  textFontStyle: QsEnumTextFontStyle.ITALIC,
  textFontWeight: QsEnumTextFontWeight.BOLD,
  textDecorationLine: QsEnumTextDecorationLine.OVERLINE,
  textFill: 'blue',
  textAngle: 45,
  textAnchor: QsEnumTextAnchor.START,
  textStroke:  'blue',
  textAlignmentBaseline: QsEnumAlignmentBaseline.CENTER,
}`

const configExample: string = `const config: QsRadialTextConfig =  {
  useDataArea: true
  x: 50
  y: 50
  defaultDecimalPoints: 2
  defaultDecimalPoints: 3,
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
  highestViewableValue: 2,
  borderColor: 'grey',
}
${configChart}`}
  ></ChartEditor>
)
