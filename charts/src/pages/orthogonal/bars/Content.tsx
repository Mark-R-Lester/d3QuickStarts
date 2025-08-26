import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { EnumOrientation } from '../../../common/enums'
import { SimpleBarChart } from './OrthogonalBarChart'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentChartBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import { QsEnumColorScale } from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'chart',
  width: 600,
  highestViewableValue: 40,
} 
`
const barConfig: string = `
const  config={
  fillColorScaleData: {
    range: ['red', 'darkblue', 'green'],
    type: QsEnumColorScale.ORDINAL,
  }
}
`

const barDataAsString: string = `
const data: QsBarData[] = [
  { upperBoundry: 35, lowerBoundry: 5 },
  { upperBoundry: 35, lowerBoundry: 10 },
  { upperBoundry: 30, lowerBoundry: 15 },
  { upperBoundry: 25 },
  { upperBoundry: 20 },
  { upperBoundry: 15 },
  { upperBoundry: 10 },
  { upperBoundry: 5 },
]`

const chartHorizontal: string = `${canvasConfig}${barDataAsString}

const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.vertical.bars(data)
canvas.generate.orthogonal.horizontal.axis.bottom()
canvas.generate.orthogonal.vertical.axis.left({
    scale: {
      type: QsEnumAxisScaleType.BANDED,
      domain: [1, 2, 3, 4, 5, 6, 7, 8,],
    },
  }
)`

const chartVertical: string = `${canvasConfig}${barDataAsString}

const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.bars(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.BANDED,
      domain: [1, 2, 3, 4, 5, 6, 7, 8,],
    },
  }
)`

const chartWithConfig: string = `${canvasConfig}${barConfig}${barDataAsString}

const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.bars(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.BANDED,
      domain: [1, 2, 3, 4, 5, 6, 7, 8,],
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
              The Bar element renders data values as rectangular segments,
              precisely scaled and positioned within the canvas's coordinate
              system to ensure accurate and effective data visualization.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplying only the essential data, the bars element
                    produces a visualization leveraging the library's default
                    configuration parameters
                  </Typography>
                  <ContentCodeBox code={chartHorizontal} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SimpleBarChart
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
                    The bars element, when oriented vertically, functions
                    identically to its horizontal counterpart in terms of
                    configuration and behavior, with the only distinction being
                    its alignment along the vertical axis of the canvas's
                    coordinate system.
                  </Typography>
                  <ContentCodeBox code={chartVertical} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SimpleBarChart
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
                  <ContentCodeBox code={chartWithConfig} />
                </ContentTextBox>,
                <ContentChartBox>
                  <SimpleBarChart
                    canvasConfig={{
                      chartName: 'chart3',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 40,
                    }}
                    config={{
                      fillColorScaleData: {
                        range: ['red', 'darkblue', 'green'],
                        type: QsEnumColorScale.ORDINAL,
                      },
                    }}
                    orientation={EnumOrientation.VERTICAL}
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

const data: string = `interface QsBarData {
  lowerBoundry?: number
  upperBoundry: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsBarConfig {
  [key: string]: number | string | QsColorScaleData | undefined
  padding?: number
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}`

const dataExample: string = `const data: QsBarData = {
  lowerBoundry: 0,
  upperBoundry: 100,
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 0.1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsBarConfig = {
  padding: 0,
  defaultFillColor: 'blue',
  defaultFillOpacity: 1,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 0.1,
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
                    QsBarData interface
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
                    QsBarConfig interface
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
  highestViewableValue: 35,
  borderColor: 'grey',
}
${chartWithConfig}`}
  ></ChartEditor>
)
