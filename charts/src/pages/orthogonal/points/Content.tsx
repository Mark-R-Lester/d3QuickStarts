import { Typography } from '@mui/material'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { EnumOrientation } from '../../../common/enums'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentSyntaxBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { OrthogonalPointsChart } from './OrthogonalPointsChart'
import { OrthogonalPointsDefaultsChart } from './OrthogonalPointsDefaultsChart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'chart',
  width: 600,
  highestViewableValue: 40,
} 
`

const defaultsChart: string = `const data: QsPointData[] = [
  { value: 25 },
  { value: 10 },
  { value: 35 },
  { value: 25 },
  { value: 35 },
  { value: 5 },
  { value: 25 },
  { value: 25 },
]
const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.horizontal.points(data, { defaultRadius: 3 })
canvas.generate.orthogonal.vertical.axis.left([])
canvas.generate.orthogonal.horizontal.axis.bottom(
  [1, 2, 3, 4, 5, 6, 7, 8],
  { domainScale: QsEnumAxisScaleType.POINT }
)`

const configChart: string = `const data: QsPointData[] = [
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
]
const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
canvas.generate.orthogonal.vertical.points(data, { defaultRadius: 3 })
canvas.generate.orthogonal.vertical.axis.left(
  [1, 2, 3, 4, 5, 6, 7, 8],
  { domainScale: QsEnumAxisScaleType.POINT }
 )
canvas.generate.orthogonal.horizontal.axis.bottom([])`

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

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
  [key: string]: number | QsColorScaleData | string | undefined
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
  [key: string]: number | QsColorScaleData | string | undefined
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

export const defaultsContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Points generated with defaults</ContentTitle>,
      <ContentBox>
        <Typography variant="body1">content</Typography>
      </ContentBox>,
      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">content</Typography>
                  <Typography variant="body1">content</Typography>
                </ContentTextBox>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers={true}
                  >
                    {defaultsChartAll}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <OrthogonalPointsDefaultsChart
              canvasProps={{
                chartName: 'chartH',
                width: 600,
                lowestViewableValue: 0,
                highestViewableValue: 35,
              }}
              orientation={EnumOrientation.HORIZONTAL}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

export const configContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Points customised</ContentTitle>,
      <ContentBox>
        <Typography variant="body1">content</Typography>
      </ContentBox>,

      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">content</Typography>
                  <Typography variant="body1">content</Typography>
                </ContentTextBox>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers={true}
                  >
                    {configChartAll}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <OrthogonalPointsChart
              canvasProps={{
                chartName: 'chartV',
                width: 600,
                lowestViewableValue: 0,
                highestViewableValue: 35,
              }}
              orientation={EnumOrientation.VERTICAL}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

export const configAndData: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">QsPointData interface</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">Interface:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {data}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentSyntaxBox>
                  {' '}
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {dataExample}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
          ]}
        />
      </ContentBox>,
      <ContentTitle variant="h4">QsPointConfig interface</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">interface:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {config}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {configExample}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
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
${configChart}`}
  ></ChartEditor>
)
