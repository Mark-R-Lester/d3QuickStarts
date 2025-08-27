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
import { OrthogonalLineChart } from './OrthogonalLineChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import { QsEnumCurve } from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'chart',
  width: 600,
  highestViewableValue: 40,
}`

const lineData: string = `const data = {
  data: [25, 10, 35, 25, 35, 5, 25, 25],
}`
const lineDataComplex: string = `const data = {
  data: [25, 10, 35, 25, 35, 5, 25, 25],
  strokeColor: 'red',
  strokeWidth: 1,
}`
const lineConfig: string = `const config = { curve: QsEnumCurve.NATURAL }`

const chart1: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.line(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.POINT,
      domain: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  }
)`

const chart2: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.vertical.line(data)
canvas.generate.orthogonal.vertical.axis.left({
  scale: {
    type: QsEnumAxisScaleType.POINT,
    domain: [1, 2, 3, 4, 5, 6, 7, 8],
  },
})
canvas.generate.orthogonal.horizontal.axis.bottom()`

const chart3: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.configStore.orthogonal.lineConfig(config)
canvas.generate.orthogonal.horizontal.line(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.POINT,
      domain: [1, 2, 3, 4, 5, 6, 7, 8],
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
              The Line element depicts data values by rendering a continuous or
              segmented path, precisely scaled and positioned within the
              canvas's coordinate system to ensure accurate and effective data
              visualization.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplying only the essential data, the OrthogonalLine
                    element produces a visualization leveraging the library's
                    default configuration parameters
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={lineData} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalLineChart
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
                    The Line element, when oriented vertically, functions
                    identically to its horizontal counterpart in terms of
                    configuration and behavior, with the only distinction being
                    its alignment along the vertical axis of the canvas's
                    coordinate system.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={lineData} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalLineChart
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
              substantially change the visual appearance of the OrthogonalLine
              element, enabling diverse and tailored data visualizations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This demonstration highlights the application of the
                    OrthogonalLine element, illustrating the effects of color
                    and opacity settings for data visualization, alongside curve
                    parameters in the configuration to customize the visual
                    output.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={lineConfig} />
                  <ContentCodeBox code={lineDataComplex} />
                  <ContentCodeBox code={chart3} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalLineChart
                    canvasConfig={{
                      chartName: 'chart3',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 40,
                    }}
                    data={{
                      data: [25, 10, 35, 25, 35, 5, 25, 25],
                      strokeColor: 'red',
                      strokeWidth: 1,
                    }}
                    config={{ curve: QsEnumCurve.NATURAL }}
                    orientation={EnumOrientation.HORIZONTAL}
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

const data: string = `interface QsLineData {
  [key: string]: number[] | string | number | undefined
  data: number[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}`

const config: string = `interface QsLineConfig {
  [key: string]: QsEnumCurve | number | string | undefined
  scaleType?: QsEnumScaleType
  curve?: QsEnumCurve
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  strokeLineJoin?: QsEnumLineJoin
  strokeLineCap?: QsEnumLineCap
}`

const dataExample: string = `const data: QsLineData = {
  data: number[1, 2, 3, 4, 5],
  strokeOpacity?: number,
  strokeColor?: 'blue',
  strokeWidth?: 1
}`

const configExample: string = `const config: QsLineConfig = {
  scaleType: QsEnumScaleType.BANDED,
  curve: QsEnumCurve.NATURAL,
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
                    QsLineData interface
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
                    QsLineConfig interface
                  </Typography>
                  <ContentCodeBox code={config} />
                </ContentTextBox>,
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Example
                  </Typography>
                  <ContentCodeBox code={configExample} />,
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
  highestViewableValue: 40,
  borderColor: 'grey',
}
${lineConfig}
${lineDataComplex}
${chart3}`}
  ></ChartEditor>
)
