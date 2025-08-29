import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { EnumOrientation } from '../../../common/enums'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentChartBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { OrthogonalPointsChart } from './OrthogonalPointsChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import { QsEnumScaleType } from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'chart',
  width: 600,
  highestViewableValue: 40,
} 
`

const pointData: string = `const data: QsPointData[] = [
  { value: 25 },
  { value: 10 },
  { value: 35 },
  { value: 25 },
  { value: 35 },
  { value: 5 },
  { value: 25 },
  { value: 25 },
]`

const pointDataComplex: string = `const data: QsPointData[] = [
  {
    value: 25,
    fillColor: 'green',
    radius: 10,
    strokeWidth: 5,
    strokeColor: 'red',
    strokeOpacity: 0.4,
    fillOpacity: 0.5,
  },
  { value: 10 },
  { value: 35, fillColor: 'red' },
  { value: 25 },
  { value: 35, fillColor: 'red' },
  { value: 5 },
  { value: 25, fillColor: 'red' },
  { value: 25 },
]`

const lineConfig: string = `const config = {
  defaultRadius: 5,
  scaleType: QsEnumScaleType.BANDED,
}`

const chartH: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.points(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.POINT,
      domain: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  }
)`

const chartV: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.vertical.points(data, config)
canvas.generate.orthogonal.vertical.axis.left({
    scale: {
      type: QsEnumAxisScaleType.POINT,
      domain: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  }
)
canvas.generate.orthogonal.horizontal.axis.bottom()`

const chartConfig: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.points(data, config)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.BANDED,
      domain: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  }
)`

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
              The points element renders data values as circles, precisely
              scaled and positioned within the canvas's coordinate system to
              ensure accurate and effective data visualization.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplying only the essential data, the points element
                    produces a visualization leveraging the library's default
                    configuration parameters
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={pointData} />
                  <ContentCodeBox code={chartH} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalPointsChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 40,
                    }}
                    orientation={EnumOrientation.HORIZONTAL}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    The points element, when oriented vertically, functions
                    identically to its horizontal counterpart in terms of
                    configuration and behavior, with the only distinction being
                    its alignment along the vertical axis of the canvas's
                    coordinate system.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={pointData} />
                  <ContentCodeBox code={chartV} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalPointsChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 40,
                    }}
                    orientation={EnumOrientation.VERTICAL}
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
              Adjusting the configuration parameters or input data can
              substantially change the visual appearance of the points element,
              enabling diverse and tailored data visualizations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This chart demonstrates the impact config and data can have
                    on the points element, illustrating the effects of color,
                    size and opacity.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={lineConfig} />
                  <ContentCodeBox code={pointDataComplex} />
                  <ContentCodeBox code={chartConfig} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalPointsChart
                    canvasConfig={{
                      chartName: 'chart3',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 40,
                    }}
                    orientation={EnumOrientation.HORIZONTAL}
                    config={{
                      defaultRadius: 5,
                      scaleType: QsEnumScaleType.BANDED,
                    }}
                    data={[
                      {
                        value: 25,
                        fillColor: 'green',
                        radius: 10,
                        strokeWidth: 5,
                        strokeColor: 'red',
                        strokeOpacity: 0.4,
                        fillOpacity: 0.5,
                      },
                      { value: 10 },
                      { value: 35, fillColor: 'red' },
                      { value: 25 },
                      { value: 35, fillColor: 'red' },
                      { value: 5 },
                      { value: 25, fillColor: 'red' },
                      { value: 25 },
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

const data: string = `interface QsPointData {
  value: number
  radius?: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsPointsConfig {
  scaleType?: QsEnumScaleType
  defaultRadius?: number
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}`

const dataExample: string = `const config: QsPointData {
  value: 3,
  radius: 3,
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsBarConfig = {
  scaleType: QsEnumScaleType.BANDED,
  defaultRadius: 3,
  defaultFillColor: 'blue',
  defaultFillOpacity: 1,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 3,
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
  highestViewableValue: 40,
  borderColor: 'grey',
}
${lineConfig}
${pointDataComplex}
${chartConfig}`}
  ></ChartEditor>
)
