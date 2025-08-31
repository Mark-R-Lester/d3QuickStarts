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
import { PlottedTextChart } from './PlottedTextChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  lowestViewableValueX: 0,
  highestViewableValueX: 35,
  lowestViewableValueY: 0,
  highestViewableValueY: 35,
}`

const data1: string = `const data: QsPlottedTextData[] = [
  [
    { x: 0, y: 0 },
    { x: 5, y: 10 },
    { x: 10, y: 5 },
    { x: 15, y: 20 },
    { x: 20, y: 15 },
    { x: 25, y: 20 },
  ],
]`

const data2: string = `const data: QsPlottedTextData[] = [
  { x: 15, y: 30, text: 'MAX' },
]`

const data3: string = `const data: QsPlottedTextData[] = [
  { x: 20, y: 20, text: 'Why would you want to do this?' },
]`

const chart1: string = `
const canvas: QsCanvasOrthogonal = qsCreateCanvasPlotted(canvasConfig)
canvas.generate.plotted.line({
  coordinates: [
    { x: 0, y: 0 },
    { x: 5, y: 10 },
    { x: 10, y: 5 },
    { x: 15, y: 30 },
    { x: 20, y: 15 },
    { x: 25, y: 20 },
  ],
})
canvas.generate.plotted.text(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

const chart2: string = `
const canvas: QsCanvasOrthogonal = qsCreateCanvasPlotted(canvasConfig)
canvas.generate.plotted.line({
  coordinates: [
    { x: 0, y: 0 },
    { x: 5, y: 10 },
    { x: 10, y: 5 },
    { x: 15, y: 30 },
    { x: 20, y: 15 },
    { x: 25, y: 20 },
  ],
})
canvas.generate.plotted.text(data, config)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

const textConfig2: string = `const config: QsPlottedTextConfig = {
  defaultTextFont: QsEnumTextFont.FANTASY,
  defaultTextFontSize: 10,
  defaultTextFontStyle: QsEnumTextFontStyle.ITALIC,
  defaultTextStroke: 'red',
}`

const textConfig3: string = `const config: QsPlottedTextConfig =  {
  defaultTextFont: QsEnumTextFont.HELVETICA,
  defaultTextFontSize: 7,
  defaultTextFontWeight: QsEnumTextFontWeight.BOLD,
  defaultTextFill: 'blue',
  defaultTextAngle: 10,
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
              Plotted Text is designed to complement plotted line and points
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplying only the essential data, plotted points
                    produces a visualization leveraging the library's default
                    configuration parameters. Resulting in the suplied
                    coordinates being shown within the visualisation.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <PlottedTextChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValueX: 0,
                      highestViewableValueX: 35,
                      lowestViewableValueY: 0,
                      highestViewableValueY: 35,
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
                    Displaying the coordinates coordinates is not always the
                    most useful use of text. Adjusting the configuration and
                    data can substantially change the visual appearance of
                    plotted text, enabling diverse and tailored data
                    visualizations.
                  </Typography>

                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={textConfig2} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <PlottedTextChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValueX: 0,
                      highestViewableValueX: 35,
                      lowestViewableValueY: 0,
                      highestViewableValueY: 35,
                    }}
                    config={{
                      defaultTextFont: QsEnumTextFont.FANTASY,
                      defaultTextFontSize: 8,
                      defaultTextFontStyle: QsEnumTextFontStyle.ITALIC,
                      defaultTextFill: 'red',
                    }}
                    data={[{ x: 15, y: 30, text: 'MAX' }]}
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
                  <Typography variant="body2" gutterBottom>
                    Text does not have to be tied to data
                  </Typography>

                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={textConfig3} />
                  <ContentCodeBox code={data3} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <PlottedTextChart
                    canvasConfig={{
                      chartName: 'chart3',
                      width: 600,
                      lowestViewableValueX: 0,
                      highestViewableValueX: 35,
                      lowestViewableValueY: 0,
                      highestViewableValueY: 35,
                    }}
                    config={{
                      defaultTextFont: QsEnumTextFont.PAPYRUS,
                      defaultTextFontSize: 7,
                      defaultTextFontWeight: QsEnumTextFontWeight.BOLD,
                      defaultTextFill: 'blue',
                      defaultTextAngle: 190,
                    }}
                    data={[
                      {
                        x: 20,
                        y: 20,
                        text: 'Why would you want to do this?',
                      },
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

const data: string = `interface QsPlottedTextData {
  x: number,
  y: number,
  text: string
}`

const config: string = `interface QsPlottedTextConfig {
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

const dataExample: string = `const data: QsPlottedTextData = {
  x: 10,
  y: 20,
  text: 'hello world'
}`

const configExample: string = `const config: QsPlottedTextConfig = {
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
  highestViewableValueX: 35,
  lowestViewableValueY: 0,
  highestViewableValueY: 35,
  borderColor: 'grey',
}
${data2}
${textConfig2}
${chart2}`}
  ></ChartEditor>
)
