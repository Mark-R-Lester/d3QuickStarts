import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { OrthogonalBarsGroupedChart } from './OrthogonalBarsGroupedChart'
import { OrthogonalBarsGroupedDefaultsChart } from './OrthogonalBarsGroupedDefaultsChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

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

const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

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

const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

canvas.generate.orthogonal.horizontal.barGroup(data)
canvas.generate.orthogonal.vertical.axis.left()
canvas.generate.orthogonal.horizontal.axis.bottom({
    scale: {
      type: QsEnumAxisScaleType.BANDED,
      domain: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  }
)`

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

const qsBarGroupData: string = `number[][]`

const qsBarGroupConfig: string = `export interface QsBarGroupConfig {
  [key: string]: number | Iterable<String> | undefined
  padding?: number
  colorRange?: Iterable<String>
}`

const qsBarGroupDataExample: string = `const data = [
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

const qsBarGroupConfigExample: string = `const defaults: BarGroupConfig = {
  colorRange: ['red', 'blue','green','orange'],
  padding: 20,
}`

export const defaultsContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Bar group defaults</ContentTitle>,
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
                <ContentCodeBox code={defaultsChartAll} />,
              ]}
            />,
            <OrthogonalBarsGroupedDefaultsChart
              canvasProps={{
                chartName: 'barGroupDefaultsContent',
                width: 600,
                lowestViewableValue: 0,
                highestViewableValue: 50,
              }}
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
      <ContentTitle variant="h4">Bar group</ContentTitle>,
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
                <ContentCodeBox code={configChartAll} />,
              ]}
            />,
            <OrthogonalBarsGroupedChart
              canvasProps={{
                chartName: 'barGroupContent',
                width: 600,
                lowestViewableValue: 0,
                highestViewableValue: 50,
              }}
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
      <ContentTitle variant="h4">QsBarGroupData interface</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">Interface:</Typography>,
                <ContentCodeBox code={qsBarGroupData} />,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentCodeBox code={qsBarGroupDataExample} />,
              ]}
            />,
          ]}
        />
      </ContentBox>,
      <ContentTitle variant="h4">QsBarGroupConfig interface</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">interface:</Typography>,
                <ContentCodeBox code={qsBarGroupConfig} />,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentCodeBox code={qsBarGroupConfigExample} />,
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
