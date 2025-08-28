import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { OrthogonalAreaChart } from './OrthogonalAreaChart'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentChartBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { OrthogonalAreaStackedChart } from './OrthogonalAreaStackedChart'
import { QsEnumDataScale } from 'd3qs/d3QuickStart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'orthogonalArea',
  width: 600,
  highestViewableValue: 190,
} 
`

const data1: string = `const data1: QsAreaData = {
  highValues: [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140]
}`

const data2: string = `const data2: QsAreaData = {
  lowValues: [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140],
  highValues: [25, 15, 40, 36, 80, 100, 96, 136, 125, 155, 170, 190],
  fillColor: 'darkBlue',
}`

const areaConfig: string = `const config: QsAreaConfig = {
  curve: QsEnumCurve.NATURAL,
  defaultFillOpacity: 0.4,
  defaultFillColor: 'orange'
}`

const defaultsChart: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.area(data1)
canvas.generate.orthogonal.vertical.axis.left()`

const configChart: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.configStore.orthogonal.areaConfig(config)
canvas.generate.orthogonal.horizontal.area(data1)
canvas.generate.orthogonal.horizontal.area(data2)
canvas.generate.orthogonal.vertical.axis.left()`

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
              The orthogonal area element visually depicts data values through a
              filled or outlined area, scaled and positioned according to the
              canvas's coordinate system.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplying only the essential data, the OrthogonalArea
                    element produces a visualization leveraging the library's
                    default configuration parameters
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={defaultsChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalAreaChart
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
              Using config and data to modify appearance
            </Typography>,
            <Typography variant="body1">
              Adjusting the configuration parameters or input data can
              substantially change the visual appearance of the OrthogonalArea
              element, enabling diverse and tailored data visualizations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This demonstration highlights the application of the
                    OrthogonalArea element, illustrating the effects of color
                    and opacity settings for data visualization, alongside curve
                    parameters in the configuration to customize the visual
                    output.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={areaConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={configChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalAreaStackedChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 190,
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

const data: string = `interface QsAreaData {
  lowValues?: number[]
  highValues: number[]
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsAreaConfig {
  [key: string]: CurveFactory | string | number | undefined
  curve?: QsEnumCurve
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  strokeLineJoin?: QsEnumLineJoin
  strokeLineCap?: QsEnumLineCap
}`

const dataExample: string = `const data: QsAreaData = {
  lowValues: [1, 2, 3, 4, 5, 6, 7, 8],
  highValues: [2, 3, 4, 5, 6, 7, 8, 9],
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 2,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsAreaConfig = {
  curve: QsEnumCurve.LINEAR,
  defaultFillColor: 'blue',
  defaultFillOpacity: 1,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: number,
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
                    QsAreaData interface
                  </Typography>
                  <ContentCodeBox code={data} />,
                </ContentTextBox>,
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Example
                  </Typography>
                  <ContentCodeBox code={dataExample} />,
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
    lowestViewableValue: 0,
    highestViewableValue: 200,
    borderColor: 'grey',
  }

${areaConfig}
${data1}
${data2}
${configChart}
`}
  ></ChartEditor>
)
