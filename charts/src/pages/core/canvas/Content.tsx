import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import { SimpleCanvas } from './SimpleCanvas'
import { SimpleCanvasWithArea } from './SimpleCanvasWithArea'
import {
  ContentBox,
  ContentChartBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const defaultsChart: string = `qsCreateCanvasOrthogonal(canvasConfig)`

const configChart: string = `const canvas = qsCreateCanvasOrthogonal(canvasConfig)
const data: QsAreaData = {
  highValues: [100, 100],
}
canvas.generate.orthogonal.horizontal.area(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom()`

const QsCanvasConfig: string = `export interface QsCanvasConfig {
  [key: string]: string | number | undefined
  chartName: string
  width?: number
  height?: number
  marginRight?: number
  marginLeft?: number
  marginTop?: number
  marginBottom?: number
  highestViewableValue: number
  lowestViewableValue?: number
  borderColor?: string
}`

const configExample1: string = `const canvasConfig =  QsCanvasConfig {
  chartName: 'chart1',
  width: 600,
  highestViewableValue: 100,
  borderColor: 'black'
}`

const configExample2: string = `const canvasConfig =  QsCanvasConfig {
  chartName: 'chart2',
  width: 600,
  height: 250,
  highestViewableValue: 100,
  borderColor: 'black'
}`

const configExample3: string = `const canvasConfig: QsCanvasConfig = {
  chartName: 'chart2',
  width: 600,
  height: 250,
  lowestViewableValue: -10,
  highestViewableValue: 110,
  borderColor: 'black'
}`

const configExample4: string = `const canvasConfig: QsCanvasConfig = {
  chartName: 'chart4',
  width: 600,
  height: 400,
  marginRight: 45,
  marginLeft: 45,
  marginTop: 45,
  marginBottom: 45,
  lowestViewableValue: 0,
  highestViewableValue: 100,
  borderColor: 'black',
}`

export const basic: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              A blank canvas
            </Typography>,
            <Typography variant="body1">
              By default, the canvas lacks a border and features a transparent
              background. When creating charts, it is often beneficial to
              clearly define the canvas boundaries. Without a visible border,
              the canvas may appear indistinguishable, making it challenging to
              discern its edges.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This canvas is established with a basic configuration,
                    excluding any visual elements. The mandatory parameters,
                    chartName, width, and highestViewableValue must be specified
                    to configure the canvas properly. Additionally, a
                    borderColor has been incorporated to ensure the canvas
                    boundaries are clearly visible.
                  </Typography>
                  <ContentCodeBox code={configExample1} />
                  <ContentCodeBox code={defaultsChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SimpleCanvas
                    canvasConfig={{
                      chartName: 'chart',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 100,
                      borderColor: 'black',
                    }}
                  />
                  ,
                </ContentChartBox>,
              ]}
            />,

            <Typography key="title" variant="h4">
              The canvas display area
            </Typography>,
            <Typography variant="body1">
              The canvas data display area is implemented as a distinct SVG
              element, separate from the rest of the canvas. This separation
              ensures a clear and precise boundary between the visualized data
              and surrounding elements, such as axes, enhancing the overall
              clarity and organization of the chart.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    To ensure the display area is visible, it has been fully
                    populated with an orthogonal area element. Additionally,
                    axes have been incorporated to demonstrate the impact of
                    modifications to the canvas configuration.
                  </Typography>
                  <ContentCodeBox code={configExample1} />
                  <ContentCodeBox code={configChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SimpleCanvasWithArea
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      highestViewableValue: 100,
                      borderColor: 'black',
                    }}
                  />
                  ,
                </ContentChartBox>,
              ]}
            />,

            <Typography key="title" variant="h4">
              Width and height
            </Typography>,
            <Typography variant="body1">
              When specifying the width and height, you can create a rectangular
              display area with dimensions tailored to your requirements.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    The width and height attributes specify the dimensions of
                    the canvas as displayed on the screen. All elements
                    contained within the canvas are proportionally scaled to
                    align with these defined dimensions.
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    When modifying the width and height of the canvas, non-data
                    elements are proportionally scaled relative to the smaller
                    of the two dimensions, ensuring uniformity and visual
                    coherence across the chart.
                  </Typography>
                  <ContentCodeBox code={configExample2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SimpleCanvasWithArea
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      height: 250,
                      highestViewableValue: 100,
                      borderColor: 'black',
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,

            <Typography key="title" variant="h4">
              lowestViewableValue and highestViewableValue
            </Typography>,
            <Typography variant="body1">
              The lowestViewableValue and highestViewableValue parameters play a
              critical role in shaping the visualization of data on the canvas.
              By defining the data range, these values directly impact the
              scaling and rendering of chart elements, ensuring accurate and
              effective data representation.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    In this example, the lowestViewableValue is set to -10, and
                    the highestViewableValue is set to 110, while the area
                    extends from 0 to 100. Consequently, this configuration
                    creates visible gaps at the top and bottom of the chart, as
                    the data does not fully utilize the specified viewable
                    range.
                  </Typography>
                  <ContentCodeBox code={configExample3} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SimpleCanvasWithArea
                    canvasConfig={{
                      chartName: 'chart3',
                      width: 600,
                      height: 250,
                      lowestViewableValue: -10,
                      highestViewableValue: 110,
                      borderColor: 'black',
                    }}
                  />
                  ,
                </ContentChartBox>,
              ]}
            />,

            <Typography key="title" variant="h4">
              The margins
            </Typography>,
            <Typography variant="body1">
              The margins establish the spacing around the data visualization
              area on the canvas.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Here, each margin is configured to 45, expressed as a
                    percentage of the canvas width or height, depending on the
                    margin in question (top and bottom margins relate to height,
                    while left and right margins relate to width). As a result,
                    the data visualization is confined to 10% of the canvas
                    height and 10% of the canvas width.
                  </Typography>
                  <ContentCodeBox code={configExample4} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SimpleCanvasWithArea
                    canvasConfig={{
                      chartName: 'chart4',
                      width: 600,
                      height: 250,
                      marginRight: 45,
                      marginLeft: 45,
                      marginTop: 45,
                      marginBottom: 45,
                      lowestViewableValue: 0,
                      highestViewableValue: 100,
                      borderColor: 'black',
                    }}
                  />
                  ,
                </ContentChartBox>,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

export const orthogonal: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              A blank canvas
            </Typography>,
            <Typography variant="body1">
              By default, the canvas lacks a border and features a transparent
              background. When creating charts, it is often beneficial to
              clearly define the canvas boundaries. Without a visible border,
              the canvas may appear indistinguishable, making it challenging to
              discern its edges.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This canvas is established with a basic configuration,
                    excluding any visual elements. The mandatory parameters,
                    chartName, width, and highestViewableValue must be specified
                    to configure the canvas properly. Additionally, a
                    borderColor has been incorporated to ensure the canvas
                    boundaries are clearly visible.
                  </Typography>
                  <ContentCodeBox code={configExample1} />
                  <ContentCodeBox code={defaultsChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SimpleCanvas
                    canvasConfig={{
                      chartName: 'chart',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 100,
                      borderColor: 'black',
                    }}
                  />
                  ,
                </ContentChartBox>,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

export const plotted: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              A blank canvas
            </Typography>,
            <Typography variant="body1">
              By default, the canvas lacks a border and features a transparent
              background. When creating charts, it is often beneficial to
              clearly define the canvas boundaries. Without a visible border,
              the canvas may appear indistinguishable, making it challenging to
              discern its edges.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This canvas is established with a basic configuration,
                    excluding any visual elements. The mandatory parameters,
                    chartName, width, and highestViewableValue must be specified
                    to configure the canvas properly. Additionally, a
                    borderColor has been incorporated to ensure the canvas
                    boundaries are clearly visible.
                  </Typography>
                  <ContentCodeBox code={configExample1} />
                  <ContentCodeBox code={defaultsChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SimpleCanvas
                    canvasConfig={{
                      chartName: 'chart',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 100,
                      borderColor: 'black',
                    }}
                  />
                  ,
                </ContentChartBox>,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

export const radial: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              A blank canvas
            </Typography>,
            <Typography variant="body1">
              By default, the canvas lacks a border and features a transparent
              background. When creating charts, it is often beneficial to
              clearly define the canvas boundaries. Without a visible border,
              the canvas may appear indistinguishable, making it challenging to
              discern its edges.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This canvas is established with a basic configuration,
                    excluding any visual elements. The mandatory parameters,
                    chartName, width, and highestViewableValue must be specified
                    to configure the canvas properly. Additionally, a
                    borderColor has been incorporated to ensure the canvas
                    boundaries are clearly visible.
                  </Typography>
                  <ContentCodeBox code={configExample1} />
                  <ContentCodeBox code={defaultsChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SimpleCanvas
                    canvasConfig={{
                      chartName: 'chart',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 100,
                      borderColor: 'black',
                    }}
                  />
                  ,
                </ContentChartBox>,
              ]}
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
      <ContentTitle variant="h4">QsCanvasConfig</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">Interface:</Typography>,
                <ContentCodeBox code={QsCanvasConfig} />,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentCodeBox code={configExample4} />,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

export const editor: JSX.Element = (
  <ChartEditor
    initialCode={`
  const canvasConfig = {
    chartName: 'ChartEditable',
    width: 600,
    height: 300,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    lowestViewableValue: 0,
    highestViewableValue: 100,
    borderColor: 'black',
  }
  ${configChart}
`}
  />
)
