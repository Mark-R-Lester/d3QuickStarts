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
import { RadialAreaChart } from './RadialAreaChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 25,
  borderColor: 'grey',
}`

const configArea: string = `const canvasConfig = {
  defaultFillOpacity: 0.25,
  defaultStrokeWidth: 1,
  defaultStrokeColor: 'lightBlue',
}`

const data1: string = `const data1: QsRadialAreaData = {
  highValues: [
    16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17,
    18, 20, 17, 23, 23, 20, 17, 16, 16,
  ],
}`

const data2: string = `const data2: QsRadialAreaData = {
  lowValues: [
    15, 15, 15, 17, 16, 21, 14, 15, 16, 12, 15, 15, 15, 17, 16, 15, 15,
    15, 17, 16, 21, 14, 15, 16, 12, 15,
  ],
  highValues: [
    16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17,
    18, 20, 17, 23, 23, 20, 17, 16, 16,
  ],
  fillColor: 'darkBlue',
}`

const chart1: string = `
const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialCentroid.area(data1)`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialCentroid.area(data1)
canvas.generate.radialCentroid.area(data2)`

export const basics: JSX.Element = (
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
              The radial area element displays data as a filled, continuous
              shape radiating from a central point, mapping values within a
              polar coordinate system to create a smooth, enclosed visualization
              of cyclic or angular trends.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplying only the essential data, the radial centroid
                    area element produces a visualization leveraging the
                    library's default configuration parameters
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAreaChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      highestViewableValue: 25,
                      borderColor: 'grey',
                    }}
                  />
                  ,
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
              Adjusting the configuration parameters or input data can
              substantially change the visual appearance of the area, enabling
              diverse and tailored data visualizations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This chart demonstrates the impact config and data can have
                    on the line.
                  </Typography>

                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={configArea} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAreaChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 25,
                    }}
                    config={{
                      defaultFillOpacity: 0.25,
                      defaultStrokeWidth: 0.75,
                      defaultFillColor: 'orange',
                      defaultStrokeColor: 'orange',
                    }}
                    data2={{
                      lowValues: [
                        15, 15, 15, 17, 16, 21, 14, 15, 16, 12, 15, 15, 15, 17,
                        16, 15, 15, 15, 17, 16, 21, 14, 15, 16, 12, 15,
                      ],
                      highValues: [
                        16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20,
                        17, 16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16,
                      ],
                      fillColor: 'green',
                      strokeColor: 'green',
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

const data: string = `interface QsRadialAreaData {
  highValues: number[]
  lowValues?: number[]
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsRadialAreaConfig {
  curve?: QsEnumCurve
  x?: number
  y?: number
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  strokeLineJoin?: QsEnumLineJoin
  strokeLineCap?: QsEnumLineCap
}`

const dataExample: string = `const data: QsPlottedLineData = {
  highValues: [15, 15, 15, 17, 16],
  lowValues: [16, 17, 18, 20, 17],
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue'
  strokeWidth: 1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsRadialAreaConfig = {
  curve: QsEnumCurve.NATURAL,
  x: 50,
  y: 50,
  defaultFillColor: 'blue',
  defaultFillOpacity: 1,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 1,
  defaultStrokeOpacity: 1,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
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
  highestViewableValue: 25,
  borderColor: 'grey',
}
${data1}
${data2}
${chart2}`}
  ></ChartEditor>
)
