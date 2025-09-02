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
import { RadialSpokesChart } from './RadailSpokesChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 25,
  borderColor: 'grey',
}`

const chart1: string = `
const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
const numberOfSpokes = 6
canvas.generate.radialCentroid.spokes(numberOfSpokes)`

const chart2: string = `
const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
const numberOfSpokes = 6
canvas.generate.radialCentroid.spokes(numberOfSpokes)`

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
              Radial spokes in visualizations like radial charts or polar plots
              are not data-driven but serve as reference lines to enhance
              clarity. Radiating from the chart’s center, they mark consistent
              angular intervals (e.g., every 45° or π/4 radians), helping
              viewers interpret the angular distribution of data points. Spokes
              provide a visual grid, making it easier to track positions (e.g.,
              0°, 90°, 180°) and compare shapes, such as a radial area’s
              outline. Typically drawn to a fixed or maximum radius, they use
              subtle styling (e.g., light gray, dashed lines) to avoid
              overshadowing data, ensuring focus remains on the primary
              visualization while improving readability.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    When supplied with only essential data, the spokes leverage
                    the library's default configuration parameters, such as
                    stroke color, width, and radius. By providing minimal data,
                    it defaults to preset styles, ensuring spokes radiate from
                    the center to a fixed or maximum radius. This simplifies
                    implementation, generating a set of spokes that supports the
                    primary data visualization without requiring extensive
                    customization.
                  </Typography>
                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={chart1} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialSpokesChart
                    canvasConfig={{
                      chartName: 'chart1',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 180,
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
              Adjusting configuration parameters for radial spokes significantly
              alters their visual appearance, enabling customized and effective
              data visualizations. Parameters like stroke color, width and
              length can be modified to suit the chart’s aesthetic or functional
              needs. For instance, increasing stroke width or changing to a bold
              color enhances prominence, while dashed patterns create subtlety.
              Spoke length can be set to a fixed value or tied to the maximum
              data radius for context. Ensuring spokes complement the primary
              visualization, balancing clarity and style without overwhelming
              data.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    This chart showcases how configuration parameters, like
                    stroke color, width, dash patterns, and angular intervals,
                    transform radial spokes, enhancing clarity and tailoring
                    visualizations effectively.
                  </Typography>

                  <ContentCodeBox code={canvasConfig} />
                  <ContentCodeBox code={chart2} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialSpokesChart
                    canvasConfig={{
                      chartName: 'chart2',
                      width: 600,
                      lowestViewableValue: 0,
                      highestViewableValue: 180,
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

const data: string = `number`
const config: string = ``
const dataExample: string = `6`
const configExample: string = ``

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
  highestViewableValue: 25,
  borderColor: 'grey',
}
${chart1}`}
  ></ChartEditor>
)
