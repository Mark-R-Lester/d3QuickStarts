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
import { ArcPetalChart } from './ArcPetalChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 156,
}`

const data1: string = `
const data: QsArcData[] = [{ valueArc: 10 }, { valueArc: 20 }, { valueArc: 15 }]`

const chart1: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialArc.arc(data, config)`

const config2: string = `
const config: QsArcConfig = {
  outerRadius: 100,
  innerRadius: 30,
  padding: 0.9,
}`

const data2: string = `
const data: QsArcData[] = [{ valueArc: 10 }, { valueArc: 20 }, { valueArc: 15 }]`

const chart2: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialArc.arc(data, config)`

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
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={config2} />
                  <ContentCodeBox code={data2} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <ArcPetalChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 45,
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
                    This chart demonstrates the impact config and data can have
                    on the bars element, illustrating the effects of color.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={data1} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <ArcPetalChart
                    canvasConfig={{
                      chartName: 'chart3',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 45,
                    }}
                    config={{
                      padding: 0.3,
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

const data: string = `interface QsArcData {
  value: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsRadialConfig {
  outerRadius?: number
  innerRadius?: number
  padding?: number
  cornerRadius?: number
  x?: number
  y?: number
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}`

const dataExample: string = `const data: QsArcData = {
  value: 20,
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsRadialConfig = {
  outerRadius: 90,
  innerRadius: 0,
  padding: 3,
  cornerRadius: 3,
  x: 50,
  y: 50,
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
  strokeColorScaleData: {
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
  highestViewableValue: 156,
  borderColor: 'grey',
}
${config2}
${data2}
${chart2}`}
  ></ChartEditor>
)
