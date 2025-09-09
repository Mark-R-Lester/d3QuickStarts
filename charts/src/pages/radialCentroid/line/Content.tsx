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
import { RadialLineChart } from './RadialLineChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import { QsEnumCurve } from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 25,
  borderColor: 'grey',
}`

const data1: string = `const data: QsRadialLineData = {
  values: [
    16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17, 18,
    20, 17, 23, 23, 20, 17, 16, 16,
  ],
}`

const data2: string = `const data: QsRadialLineData = {
  values: [
    16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17, 18,
    20, 17, 23, 23, 20, 17, 16, 16,
  ],
}`

const config2: string = `const config: QsRadialLineConfig = {
  curve: QsEnumCurve.NATURAL,
  defaultStrokeWidth: 1,
  defaultStrokeColor: 'green',
}`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialCentroid.line(data)
canvas.generate.radialCentroid.spokes({
  numberOfSpokes: 26,
  defaultInnerRadius: 50,
  defaultOuterRadius: 105,
})
canvas.generate.radialCentroid.axis({
  numberOfRings: 5,
  showCentralTick: false,
})`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialCentroid.line(data, config)
canvas.generate.radialCentroid.spokes({
  numberOfSpokes: 26,
  defaultInnerRadius: 50,
  defaultOuterRadius: 105,
})
canvas.generate.radialCentroid.axis({
  numberOfRings: 5,
  showCentralTick: false,
})`

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
              The centroid line element is a visualisation technique that
              presents data as a continuous line radiating around a central
              point within a polar coordinate system. It maps values to angular
              positions derived from basic data, forming an enclosed shape that
              accentuates cyclic or angular trends. Ideal for depicting periodic
              data, such as time-based patterns or directional distributions,
              the centroid line highlights symmetry and continuity. By filling
              the area within the line, it offers a clear, visually intuitive
              representation of data variations, making it effective for
              analysing trends in fields like meteorology, astronomy, or
              cyclical processes.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplied with only essential data, the centroid line
                    element generates a visualisation by utilising the library's
                    default configuration parameters. These parameters
                    automatically define aspects such as line smoothness, color,
                    and fill opacity, ensuring a consistent and effective
                    display. This approach simplifies the process of creating
                    polar-based visualisations, allowing users to focus on
                    inputting core data values without needing to specify
                    detailed styling or formatting options.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialLineChart
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
              Modifying the configuration parameters or input data of the
              centroid line element allows for significant customisation of the
              visualisation’s appearance. Users can adjust settings like stroke
              width and color to create distinct visual effects that suit
              specific analytical needs. Adding other elements such as an axis
              or spokes can build complex, detailed representations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This illustrates the use configuration to change the
                    appearance of the centroid line.
                  </Typography>

                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialLineChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 25,
                    }}
                    config={{
                      curve: QsEnumCurve.NATURAL,
                      defaultStrokeWidth: 1,
                      defaultStrokeColor: 'green',
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
const data: string = `interface QsRadialLineData {
  values: number[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}`

const config: string = `interface QsRadialLineConfig {
  layerType: QsEnumLayerType
  x: number
  y: number
  curve: QsEnumCurve
  strokeLineJoin: QsEnumLineJoin
  strokeLineCap: QsEnumLineCap
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
}`

const dataExample: string = `const data: QsRadialLineData = {
  values: [15, 15, 15, 17, 16],
  strokeColor: 'blue'
  strokeWidth: 1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsRadialLineConfig = {
  layerType: QsEnumLayerType
  x: 50
  y: 50
  curve: QsEnumCurve.NATURAL,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 1,
  defaultStrokeOpacity: 1,
  
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
${data2}
${config2}
${chart2}`}
  ></ChartEditor>
)
