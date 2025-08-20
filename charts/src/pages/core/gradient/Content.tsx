import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import {
  ContentBox,
  ContentChartBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import { RadialAreaGradientDemoChart } from './RadialAreaGradientDemoChart'
import { AreaConfigDemoChart } from './AreaGradientDemoChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const areaCode: string = ` const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
  chartName: \`textEnumDemo\${chartName}\`,
  height,
  width,
  highestViewableValue: 160,
})
canvas.generate.orthogonal.horizontal.area(data, config)
canvas.generate.orthogonal.vertical.axis.left()`

export const orthogonalGradientContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              Othogonal gradients
            </Typography>,
            <Typography variant="body1">
              Orthogonal gradients, blend colors along a straight line to
              enhance data visualizations. They highlight trends, like shading a
              bar chart from blue to red to show rising values. Used in line
              graphs or area charts, they can indicate progression, such as time
              or intensity, making patterns clearer. These gradients add visual
              depth and guide the viewer’s eye, making complex data more
              intuitive and engaging without overwhelming the presentation.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    An area element with default configuration
                  </Typography>
                  <ContentCodeBox code={areaCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <AreaConfigDemoChart chartName={`basicOrthogonalGradient`} />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>Some info</Typography>
                  <ContentCodeBox code={areaCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <AreaConfigDemoChart
                    chartName={`basicOrthogonalGradientConfigured`}
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

const radialGradient: string = `const gradientUrl: string = qsCreateRadialGradient({
  gradientId: 'radialGradient',
  colors: ['darkBlue', 'pink', 'lightblue'],
  cx: '50%',
  cy: '50%',
  r: '50%',
  fx: '50%',
  fy: '50%',
})`

const radialCongig: string = `const config: QsRadialAreaConfig = {
  defaultFillColor: gradientUrl,
}`

const radialData: string = `const data: QsRadialAreaData = {
  outerData: [
    150, 100, 120, 130, 140, 160, 160, 160, 150, 112, 156, 140,
  ],
}`

const radialAreaCode: string = `const canvas: QsCanvasRadial = qsCreateCanvasRadial({
  chartName: \`textEnumDemo\${chartName}\`,
  height,
  width,
  highestViewableValue: 160,
})
canvas.generate.radialCentroid.area(data, config)
canvas.generate.radialCentroid.axis([
  150, 100, 120, 130, 140, 160, 160, 160, 150, 112, 156, 140,
])`

export const radialGradientContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              Radial gradients
            </Typography>,
            <Typography variant="body1">
              Radial gradients blend colors outward from a central point,
              enhancing data visualizations by emphasizing focal areas. They
              highlight intensity, like using a yellow-to-blue gradient in a
              radial area to highlight peak values. In pie charts or scatter
              plots, they can indicate magnitude or density, drawing attention
              to key data points. These gradients add depth and focus, guiding
              the viewer’s eye to critical patterns, making complex data
              visually intuitive and engaging without cluttering the display.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    An area element with default configuration
                  </Typography>
                  <ContentCodeBox code={radialGradient} />
                  <ContentCodeBox code={radialCongig} />
                  <ContentCodeBox code={radialData} />
                  <ContentCodeBox code={radialAreaCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAreaGradientDemoChart
                    chartName={`basicRadialGradient`}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    A bars element with default configuration
                  </Typography>
                  <ContentCodeBox code={radialGradient} />
                  <ContentCodeBox code={radialCongig} />
                  <ContentCodeBox code={radialData} />
                  <ContentCodeBox code={radialAreaCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAreaGradientDemoChart
                    chartName={`basicRadialGradientConfigured`}
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
