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
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'
import { OrthogonalBarsGroupedChart } from './OrthogonalBarsGroupedChart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'chart',
  width: 600,
  highestViewableValue: 40,
} 
`

const barDataAsString: string = `const data = [
  [10, 20, 16, 23],
  [16, 32, 30, 26],
  [40, 16, 12, 16],
  [10, 4, 13, 32],
  [10, 37, 21, 8],
  [10, 20, 16, 23],
  [10, 32, 30, 26],
  [15, 16, 12, 16],
  [10, 4, 13, 32],
]`

const defaultsChart: string = `${canvasConfig}${barDataAsString}

const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

canvas.generate.orthogonal.horizontal.barGroup(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.BANDED,
      domain: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  }
)`

const configChart: string = `${canvasConfig}${barDataAsString}

const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

canvas.generate.orthogonal.horizontal.barGroup(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.BANDED,
      domain: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
                  <ContentCodeBox code={defaultsChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalBarsGroupedChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 50,
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
                  <ContentCodeBox code={configChart} />
                </ContentTextBox>,
                <ContentChartBox>
                  <OrthogonalBarsGroupedChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 60,
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

const data: string = `number[][]`

const config: string = `export interface QsBarGroupConfig {
  [key: string]: number | Iterable<String> | undefined
  padding?: number
  colorRange?: Iterable<String>
}`

const dataExample: string = `const data = [
  [10, 20, 16, 23],
  [16, 32, 30, 26],
  [40, 16, 12, 16],
  [10, 4, 13, 32],
  [10, 37, 21, 8],
  [10, 20, 16, 23],
  [10, 32, 30, 26],
  [15, 16, 12, 16],
  [10, 4, 13, 32],
]`

const configExample: string = `const defaults: BarGroupConfig = {
  colorRange: ['red', 'blue','green','orange'],
  padding: 20,
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
                    interface
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
                    QsBarStackConfig interface
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
    initialCode={`const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  lowestViewableValue: 0,
  highestViewableValue: 40,
  borderColor: 'grey',
}

${configChart}`}
  ></ChartEditor>
)
