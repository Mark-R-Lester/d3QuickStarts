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
import { RadialPointsChart } from './RadialPointsChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 10,
  borderColor: 'grey',
}`

const data1: string = `const data: QsCentroidPointData[] = [
  { value: 7 },
  { value: 3 },
  { value: 9 },
  { value: 2 },
  { value: 6 },
  { value: 8 },
  { value: 1 },
  { value: 4 },
  { value: 10 },
  { value: 5 },
  { value: 3 },
  { value: 7 },
  { value: 2 },
  { value: 9 },
]`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.centroid.area(
  {
    highValues: [7, 3, 9, 2, 6, 8, 1, 4, 10, 5, 3, 7, 2, 9],
  },
  {
    defaultFillOpacity: 0.2,
    curve: QsEnumCurve.NATURAL,
  }
)
canvas.generate.centroid.points(data)`

const config2: string = `const config: QsCentroidPointsConfig = {
  defaultRadius: 1,
  defaultFillColor: 'green',
}`

const data2: string = `const data: QsCentroidPointData[] = [
  { value: 7 },
  { value: 3 },
  { value: 9 },
  { value: 2 },
  { value: 6 },
  { value: 8 },
  { value: 1 },
  { value: 4 },
  { value: 10 },
  { value: 5 },
  { value: 3 },
  { value: 7 },
  { value: 2 },
  { value: 9 },
]`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
 canvas.generate.centroid.area(
  {
    highValues: [7, 3, 9, 2, 6, 8, 1, 4, 10, 5, 3, 7, 2, 9],
  },
  {
    defaultFillOpacity: 0.2,
    defaultStrokeColor: 'green',
    defaultStrokeWidth: 0.2,
    curve: QsEnumCurve.NATURAL,
  }
)
canvas.generate.centroid.spokes({
  numberOfSpokes: 14,
  defaultInnerRadius: 5,
  defaultOuterRadius: 102,
  defaultStrokeOpacity: 0.3,
})
canvas.generate.centroid.axis({
  numberOfTicks: 3,
  defaultStrokeOpacity: 0.3,
  defaultAxisAngle: 15,
  showText: false,
})
canvas.generate.arc.text.horizontal(
  [
    { value: 7 },
    { value: 3 },
    { value: 9 },
    { value: 2 },
    { value: 6 },
    { value: 8 },
    { value: 1 },
    { value: 4 },
    { value: 10 },
    { value: 5 },
    { value: 3 },
    { value: 7 },
    { value: 2 },
    { value: 9 },
  ],
  {
    angularPosition: QsEnumArcTextAngularPosition.CENTROID_LOCK,
    defaultRadius: 110,
  }
)
canvas.generate.centroid.points(data, config)`

const data3: string = `const data: QsCentroidPointData[] = [
  { value: 7 },
  { value: 3 },
  { value: 9 },
  { value: 2 },
  { value: 6 },
  { value: 8 },
  { value: 1, radius: 2 },
  { value: 4 },
  { value: 10, fillColor: 'red', radius: 2 },
  { value: 5 },
  { value: 3 },
  { value: 7 },
  { value: 2 },
  { value: 9 },
]`

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
              Centroid points are simple circular points primarily for
              pinpointing data on centroid charts. They are one of simplest
              elments.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Centroid points always align precisely with the data they
                    represent. This is their appearance with default settings.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialPointsChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 10,
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
                    Simple customisations can be made via configuration such as
                    stroke color, with and opacity,
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialPointsChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      highestViewableValue: 10,
                    }}
                    config={{
                      defaultRadius: 1,
                      defaultFillColor: 'green',
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Additionally appreance can be part of the data, changing
                    individual points to convey their importance.
                  </Typography>
                  <ContentCodeBox code={data3} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialPointsChart
                    canvasConfig={{
                      chartName: 'chart4',
                      width: 600,
                      highestViewableValue: 10,
                    }}
                    config={{
                      defaultRadius: 1,
                      defaultFillColor: 'green',
                    }}
                    data={[
                      { value: 7 },
                      { value: 3 },
                      { value: 9 },
                      { value: 2 },
                      { value: 6 },
                      { value: 8 },
                      { value: 1, radius: 2 },
                      { value: 4 },
                      { value: 10, fillColor: 'red', radius: 2 },
                      { value: 5 },
                      { value: 3 },
                      { value: 7 },
                      { value: 2 },
                      { value: 9 },
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

const data: string = `interface QsCentroidPointData {
  value: number
  radius?: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsCentroidPointsConfig = {
  layerType: QsEnumLayerType
  x?: number
  y?: number
  defaultRadius?: number
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}`

const dataExample: string = `const data: QsCentroidPointData = {
  value: 6,
  radius: 3,
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsCentroidPointsConfig = {
  layerType: QsEnumLayerType.DATA
  x: 50,
  y: 50,
  defaultRadius: 3,
  defaultFillColor: 'blue',
  defaultFillOpacity: 1,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 1,
  defaultStrokeOpacity: 1,
  fillColorScaleData: {
    domain: [1, 100],
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.SEQUENTIAL,
  },
  strokeColorScaleData:{
    domain: [1, 100],
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.SEQUENTIAL,
  },
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
  highestViewableValue: 10,
  borderColor: 'grey',
}
${config2}
${data3}
${chart2}`}
  ></ChartEditor>
)
