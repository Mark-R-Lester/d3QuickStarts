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
import { BarStackedChart } from './BarStackedChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
    chartName: 'ChartEditable',
    width: 600,
    highestViewableValue: 200,
  }
`

const barData: string = `const data = [
  [{ value: 10 }, { value: 20 }, { value: 16 }, { value: 23 }],
  [{ value: 16 }, { value: 32 }, { value: 30 }, { value: 26 }],
  [{ value: 40 }, { value: 16 }, { value: 12 }, { value: 16 }],
  [{ value: 10 }, { value: 4 }, { value: 13 }, { value: 32 }],
  [{ value: 10 }, { value: 37 }, { value: 21 }, { value: 8 }],
  [{ value: 10 }, { value: 20 }, { value: 16 }, { value: 23 }],
  [{ value: 10 }, { value: 32 }, { value: 30 }, { value: 26 }],
  [{ value: 15 }, { value: 16 }, { value: 12 }, { value: 16 }],
  [{ value: 10 }, { value: 4 }, { value: 13 }, { value: 32 }],
]`

const barConfig: string = `const config = {
  colorRange: ['brown', 'purple', 'red', 'pink'],
  defaultStrokeColor: 'black',
  defaultStrokeWidth: 2,
  defaultStrokeOpacity: 1,
}`

const defaultsChart: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

canvas.generate.orthogonal.horizontal.barStack(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.BANDED,
      domain: [1, 2, 3, 4, 5, 6, 7, 8,],
    },
  }
)`

const configChart: string = `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

canvas.generate.orthogonal.horizontal.barStack(data, config)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
  scale: {
    type: QsEnumAxisScaleType.BANDED,
    domain: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
})`

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
              The Stacked Bar element, while a convenient tool for visualizing
              cumulative and individual subcategory contributions through
              segmented, stacked bars, is notably limited in functionality
              compared to standard bar elements, offering less flexibility in
              layout, and configuration.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplying only the essential data, the Stacked Bar
                    element generates a visualization using the library's
                    default configuration parameters, rendering segmented bars
                    stacked vertically.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={barData} />
                  <ContentCodeBox code={defaultsChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <BarStackedChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 120,
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Configuration options for the Stacked Bar element allow
                    customization of its appearance, enabling tailored
                    visualizations by adjusting properties like colors, and axis
                    scaling within the canvas's coordinate system, though
                    limited compared to standard bar elements.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={barConfig} />
                  <ContentCodeBox code={barData} />
                  <ContentCodeBox code={configChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <BarStackedChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 200,
                    }}
                    config={{
                      colorRange: ['brown', 'purple', 'red', 'pink'],
                      defaultStrokeColor: 'black',
                      defaultStrokeWidth: 2,
                      defaultStrokeOpacity: 1,
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

const data: string = `export interface QsBarStackedData {
  value: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `export interface BarStackedConfig extends ConfigStrokeDefaults {
  layerType: QsEnumLayerType
  padding: number
  colorRange: Iterable<String>
  defaultFillOpacity: number
  defaultStrokeColor: string
  defaultStrokeWidth: number
  defaultStrokeOpacity: number
}`

const dataExample: string = `const data: QsBarStackedData  = { 
  value: 10 
  fillColor: 'blue'
  fillOpacity: 1
  strokeColor: 'blue'
  strokeWidth: 1
  strokeOpacity: 1
}`

const configExample: string = `const defaults: BarStackConfig = {
  layerType: QsEnumLayerType
  colorRange: ['red', 'blue','green','orange'],
  padding: 20,
  defaultFillOpacity: 1
  defaultStrokeColor: 'blue'
  defaultStrokeWidth: 1
  defaultStrokeOpacity: 1
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
    initialCode={`const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  lowestViewableValue: 0,
  highestViewableValue: 200,
  borderColor: 'grey',
}
${barConfig}
${barData}
${configChart}`}
  ></ChartEditor>
)
