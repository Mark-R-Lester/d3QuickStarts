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

const orthogonalGradientTwoStops: string = `const gradientUrl: string = qsCreateOrthogonalGradient({
  canvas,
  gradientId: 'areaGradient',
  colorStops: [
    { color: 'lightblue', offset: 0 },
    { color: 'darkblue', offset: 100 },
  ],
  x1: '0%',
  y1: '0%',
  x2: '0%',
  y2: '100%',
})`

const orthogonalGradientThreeStops: string = `const gradientUrl: string = qsCreateOrthogonalGradient({
  canvas,
  gradientId: 'areaGradient',
  colorStops: [
    { color: 'lightblue', offset: 0 },
    { color: 'pink', offset: 80 },
    { color: 'darkblue', offset: 100 },
  ],
  x1: '0%',
  y1: '0%',
  x2: '0%',
  y2: '100%',
})`

const orthogonalGradient: string = `const gradientUrl: string = qsCreateOrthogonalGradient({
  canvas,
  gradientId: 'areaGradient',
  colors: ['lightblue', 'darkblue'],
  x1: '0%',
  y1: '0%',
  x2: '0%',
  y2: '100%',
})`

const orthogonalGradientTilted: string = `const gradientUrl: string = qsCreateOrthogonalGradient({
  canvas,
  gradientId: 'areaGradient',
  colors: ['lightblue', 'pink'],
  x1: '0%',
  y1: '100%',
  x2: '100%',
  y2: '0%',
})`

const orthogonalConfig: string = `const config: QsRadialAreaConfig = {
  defaultFillColor: gradientUrl,
}`

const QsOrthogonalGradientColorStopData: string = `interface QsOrthogonalGradientColorStopData {
  canvas: QsCanvasOrthogonal | QsCanvasPlotted | QsCanvasRadial
  gradientId: string
  colorStops: QsColorStop[]
  x1?: string
  y1?: string
  x2?: string
  y2?: string
}`

const QsOrthogonalGradientData: string = `interface QsOrthogonalGradientData {
  canvas: QsCanvasOrthogonal | QsCanvasPlotted | QsCanvasRadial
  gradientId: string
  colors: string[]
  x1?: string
  y1?: string
  x2?: string
  y2?: string
}`

const QsOrthogonalGradientColorStopDataExample: string = `interface QsOrthogonalGradientColorStopData {
  canvas: someCanvas
  gradientId: 'someId'
  colorStops: [
    { color: 'lightblue', offset: 0 },
    { color: 'darkblue', offset: 100 },
  ],
  x1: '0%',   //default value
  y1: '0%',   //default value
  x2: '0%',   //default value
  y2: '100%', //default value
}`

const QsOrthogonalGradientDataExample: string = `interface QsOrthogonalGradientData {
  canvas: someCanvas
  gradientId: 'someId'
  colors: ['lightblue', 'darkblue'],
  x1: '0%',   //default value
  y1: '0%',   //default value
  x2: '0%',   //default value
  y2: '100%', //default value
}`

const orthogonalData: string = `const data: QsAreaData = {
  highValues: [
    150, 100, 120, 130, 140, 160, 160, 160, 150, 112, 156, 140,
  ],
}`

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
            <Typography key="title" variant="h4">
              qsCreateCustomStopOrthogonalGradient
            </Typography>,
            <Typography variant="body2" component="ul">
              Creates an orthogonal gradient with colors distributed according
              to user-specified color stops, allowing precise control over the
              gradient's appearance. This enables customized, smooth transitions
              tailored to specific design requirements in visualizations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Interface for function args
                  </Typography>
                  <ContentCodeBox code={QsOrthogonalGradientColorStopData} />
                </ContentTextBox>,
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Example: x1, y1, x2, and y2 are optional and use defaults as
                    shown
                  </Typography>
                  <ContentCodeBox
                    code={QsOrthogonalGradientColorStopDataExample}
                  />
                </ContentTextBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Two color stops are defined at 0% and 100%, ensuring an even
                    color distribution across the gradient. There is no limit to
                    the number of color stops that can be used, enabling
                    customizable gradient transitions.
                  </Typography>

                  <ContentCodeBox code={orthogonalGradientTwoStops} />
                  <ContentCodeBox code={orthogonalConfig} />
                  <ContentCodeBox code={orthogonalData} />
                  <ContentCodeBox code={areaCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <AreaConfigDemoChart
                    chartName={`basicOrthogonalGradientColorStops1`}
                    gradientId={'basicOrthogonalGradientColorStops1'}
                    colorStops={[
                      { color: 'lightblue', offset: 0 },
                      { color: 'darkblue', offset: 100 },
                    ]}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Three color stops are defined at 0%, 80%, and 100%, creating
                    an uneven color distribution across the gradient.
                  </Typography>

                  <ContentCodeBox code={orthogonalGradientThreeStops} />
                  <ContentCodeBox code={orthogonalConfig} />
                  <ContentCodeBox code={orthogonalData} />
                  <ContentCodeBox code={areaCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <AreaConfigDemoChart
                    chartName={`basicOrthogonalGradientColorStops2`}
                    gradientId={'basicOrthogonalGradientColorStops2'}
                    colorStops={[
                      { color: 'lightblue', offset: 0 },
                      { color: 'pink', offset: 80 },
                      { color: 'darkblue', offset: 100 },
                    ]}
                  />
                </ContentChartBox>,
              ]}
            />,

            <Typography key="title" variant="h4">
              qsCreateOrthogonalGradient
            </Typography>,
            <Typography variant="body2" component="ul">
              Simplifies the creation of orthogonal gradients by automatically
              distributing colors evenly across the gradient. This streamlines
              the process, ensuring a smooth, uniform transition between
              specified colors for professional and visually appealing results.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Interface for function args
                  </Typography>
                  <ContentCodeBox code={QsOrthogonalGradientData} />
                </ContentTextBox>,
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Example: x1, y1, x2, and y2 are optional and use defaults as
                    shown
                  </Typography>
                  <ContentCodeBox code={QsOrthogonalGradientDataExample} />
                </ContentTextBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Two colors are specified and automatically distributed
                    evenly across the gradient. There is no limit to the number
                    of colors that can be used, allowing flexible customization
                    of the gradient's appearance.
                  </Typography>
                  <ContentCodeBox code={orthogonalGradient} />
                  <ContentCodeBox code={orthogonalConfig} />
                  <ContentCodeBox code={orthogonalData} />
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
                  <Typography variant="body2" gutterBottom>
                    The arguments x1, y1, x2, and y2 define the start and end
                    coordinates of a linear gradient in a visualization. They
                    determine the gradient's direction, enabling smooth color
                    transitions for enhancing visual appeal or emphasizing data
                    trends in charts, interfaces, or other graphical elements.
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Here x1={'0%'} y1={'100%'} x2={'100%'} y2={'0%'}
                    resulting in the 45 degree gradient
                  </Typography>
                  <ContentCodeBox code={orthogonalGradientTilted} />
                  <ContentCodeBox code={orthogonalConfig} />
                  <ContentCodeBox code={orthogonalData} />
                  <ContentCodeBox code={areaCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <AreaConfigDemoChart
                    chartName={`basicOrthogonalGradientTilted`}
                    gradientId={`basicOrthogonalGradientTilted`}
                    colors={['lightblue', 'pink']}
                    x1={'0%'}
                    y1={'100%'}
                    x2={'100%'}
                    y2={'0%'}
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

const radialGradientStops2: string = `const gradientUrl: string = qsCreateRadialGradient({
  canvas,
  gradientId: 'radialGradient',
  colorStops: [
    { color: 'lightblue', offset: 0 },
    { color: 'darkblue', offset: 100 },
  ]
  cx: '50%',
  cy: '50%',
  r: '50%',
  fx: '50%',
  fy: '50%',
})`

const radialGradientStops3: string = `const gradientUrl: string = qsCreateRadialGradient({
  canvas,
  gradientId: 'radialGradient',
  colorStops: [
    { color: 'lightblue', offset: 0 },
    { color: 'pink', offset: 80 },
    { color: 'darkblue', offset: 100 },
  ]
  cx: '50%',
  cy: '50%',
  r: '50%',
  fx: '50%',
  fy: '50%',
})`

const radialGradient2: string = `const gradientUrl: string = qsCreateRadialGradient({
  canvas,
  gradientId: 'radialGradient',
  colors: ['darkBlue', 'lightblue'],
  cx: '50%',
  cy: '50%',
  r: '50%',
  fx: '50%',
  fy: '50%',
})`

const radialGradient3: string = `const gradientUrl: string = qsCreateRadialGradient({
  canvas,
  gradientId: 'radialGradient',
  colors: ['darkBlue', 'pink', 'lightblue'],
  cx: '50%',
  cy: '50%',
  r: '50%',
  fx: '75%',
  fy: '75%',
})`

const radialCongig: string = `const config: QsRadialAreaConfig = {
  defaultFillColor: gradientUrl,
}`

const radialData: string = `const data: QsRadialAreaData = {
  outerData: [
    150, 100, 120, 130, 140, 160, 160, 160, 150, 112, 156, 140,
  ],
}`
const QsRadialGradientColorStopData: string = `interface QsRadialGradientColorStopData {
  canvas: QsCanvasOrthogonal | QsCanvasPlotted | QsCanvasRadial
  gradientId: string
  colorStops: QsColorStop[]
  cx?: string
  cy?: string
  r?: string
  fy?: string
  fx?: string
}`

const QsRadialGradientData: string = `interface QsRadialGradientData {
  canvas: QsCanvasOrthogonal | QsCanvasPlotted | QsCanvasRadial
  gradientId: string
  colors: string[]
  cx?: string
  cy?: string
  r?: string
  fy?: string
  fx?: string
}`

const QsRadialGradientColorStopDataExample: string = `interface QsRadialGradientColorStopData {
  canvas: someCanvas
  gradientId: 'someId'
  colorStops: [
    { color: 'lightblue', offset: 0 },
    { color: 'darkblue', offset: 100 },
  ],
  cx: '50%',   //default value
  cy: '50%',   //default value
  r: '50%',    //default value
  fy: '50%',   //default value
  fx: '50%',   //default value
}`

const QsRadialGradientDataExample: string = `interface QsRadialGradientData {
  canvas: someCanvas
  gradientId: 'someId'
  colors: ['lightblue', 'darkblue'],
  cx: '50%',   //default value
  cy: '50%',   //default value
  r: '50%',    //default value
  fy: '50%',   //default value
  fx: '50%',   //default value
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
            <Typography key="title" variant="h4">
              qsCreateCustomStopRadialGradient
            </Typography>,
            <Typography variant="body2" component="ul">
              Creates a radial gradient with colors distributed according to
              user-specified color stops, allowing precise control over the
              gradient's appearance. This enables customized, smooth transitions
              tailored to specific design requirements in visualizations.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Interface for function args
                  </Typography>
                  <ContentCodeBox code={QsRadialGradientColorStopData} />
                </ContentTextBox>,
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Example: cx, cy, r, fy and fx are optional and use defaults
                    as shown
                  </Typography>
                  <ContentCodeBox code={QsRadialGradientColorStopDataExample} />
                </ContentTextBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Two color stops are defined at 0% and 100%, ensuring an even
                    color distribution across the gradient. There is no limit to
                    the number of color stops that can be used, enabling
                    customizable gradient transitions.
                  </Typography>
                  <ContentCodeBox code={radialGradientStops2} />
                  <ContentCodeBox code={radialCongig} />
                  <ContentCodeBox code={radialData} />
                  <ContentCodeBox code={radialAreaCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAreaGradientDemoChart
                    chartName={`radialGradientWithStops1`}
                    gradientId={'radialGradientWithStops1'}
                    colorStops={[
                      { color: 'lightblue', offset: 0 },
                      { color: 'darkblue', offset: 100 },
                    ]}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Three color stops are defined at 0%, 80%, and 100%, creating
                    an uneven color distribution across the gradient.
                  </Typography>
                  <ContentCodeBox code={radialGradientStops3} />
                  <ContentCodeBox code={radialCongig} />
                  <ContentCodeBox code={radialData} />
                  <ContentCodeBox code={radialAreaCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAreaGradientDemoChart
                    chartName={`radialGradientWithStops2`}
                    gradientId={'radialGradientWithStops2'}
                    colorStops={[
                      { color: 'lightblue', offset: 0 },
                      { color: 'pink', offset: 80 },
                      { color: 'darkblue', offset: 100 },
                    ]}
                  />
                </ContentChartBox>,
              ]}
            />,
            <Typography key="title" variant="h4">
              qsCreateRadialGradient
            </Typography>,
            <Typography variant="body2" component="ul">
              Simplifies the creation of radial gradients by automatically
              distributing colors evenly across the gradient. This streamlines
              the process, ensuring a smooth, uniform transition between
              specified colors for professional and visually appealing results.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Interface for function args
                  </Typography>
                  <ContentCodeBox code={QsRadialGradientData} />
                </ContentTextBox>,
                <ContentTextBox>
                  <Typography variant="body2" gutterBottom>
                    Example: cx, cy, r, fy and fx are optional and use defaults
                    as shown
                  </Typography>
                  <ContentCodeBox code={QsRadialGradientDataExample} />
                </ContentTextBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Two colors are specified and automatically distributed
                    evenly across the gradient. There is no limit to the number
                    of colors that can be used, allowing flexible customization
                    of the gradient's appearance.
                  </Typography>
                  <ContentCodeBox code={radialGradient2} />
                  <ContentCodeBox code={radialCongig} />
                  <ContentCodeBox code={radialData} />
                  <ContentCodeBox code={radialAreaCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAreaGradientDemoChart chartName={`radialGradient`} />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    The arguments cx, cy, r, fx, and fy define the structure of
                    a radial gradient in a visualization. cx and cy set the
                    center, r determines the radius, and fx and fy specify the
                    focal point. They control the gradient’s spread and focus,
                    enhancing visual depth or highlighting data patterns in
                    charts and graphical elements. Here x1=0% y1=100% x2=100%
                    y2=0%resulting in the 45 degree gradient
                  </Typography>
                  <Typography>
                    Settings cx:'50%', cy:'50%', r:'50%', fx:'75%', and
                    fy:'75%'. Gradient's center (cx, cy) is at the middle (50%,
                    50%) of the element's bounding box, with a radius (r)
                    extending to 50% of the box. The focal point (fx, fy) at
                    (75%, 75%) shifts the gradient's starting point toward the
                    bottom-right corner, creating an asymmetric, spotlight-like
                    effect with colors radiating from this offset point.
                  </Typography>
                  <ContentCodeBox code={radialGradient3} />
                  <ContentCodeBox code={radialCongig} />
                  <ContentCodeBox code={radialData} />
                  <ContentCodeBox code={radialAreaCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAreaGradientDemoChart
                    chartName={`radialGradient2`}
                    gradientId={'radialGradient2'}
                    colors={['darkBlue', 'pink', 'lightblue']}
                    cx={'50%'}
                    cy={'50%'}
                    r={'50%'}
                    fx={'75%'}
                    fy={'75%'}
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
