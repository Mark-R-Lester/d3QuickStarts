import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import {
  ContentBox,
  ContentChartBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import { BarColorDemoChart } from './BarColorDemoChart'
import { QsEnumColorScale } from 'd3qs/d3QuickStart'
import { BarColorDemoChartWithData } from './BarColorDemoChartWithData'
import { AreaConfigDemoChart } from './AreaConfigDemoChart'
import { MultiAreaConfigDemoChart } from './MultiAreaConfigDemoChart'
import { MultiBarConfigDemoChart } from './MultiBarConfigDemoChart'
import { ContentCodeBox } from '../../../components/atoms/content/ContentCodeBox'

const getCodeSample = (
  elementType: string,
  highestViewableValue: string,
  configType?: string,
  elementConfig1: string = '',
  elementConfig2: string = ''
): string => `const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
  chartName: \`textEnumDemo\${chartName}\`,
  height: 300,
  width: 500,
  highestViewableValue: ${highestViewableValue},
})
${configType ? `canvas.configStore.orthogonal.${configType}Config(configCanvasLevel)` : ``}
canvas.generate.orthogonal.horizontal.${elementType}(data1${elementConfig1})
canvas.generate.orthogonal.horizontal.${elementType}(data2${elementConfig2})
canvas.generate.orthogonal.vertical.axis.left()`

const mutliAreaCodeNoConfig: string = getCodeSample('area', '160')
const mutliBarCodeNoConfig: string = getCodeSample('bars', '80')
const mutliAreaCodeConfigCanvasLevel: string = getCodeSample(
  'area',
  '160',
  'area'
)
const mutliBarCodeConfigCanvasLevel: string = getCodeSample('bars', '80', 'bar')
const mutliAreaCodeConfigElementLevel: string = getCodeSample(
  'area',
  '160',
  'area',
  ', config1'
)
const mutliBarCodeConfigElementLevel: string = getCodeSample(
  'bars',
  '80',
  'bar',
  ', config1'
)

const areaConfigCanvasLevel: string = `const configCanvasLevel: QsAreaConfig = {
  defaultFillColor: 'blue',
  defaultFillOpacity: 0.1,
  defaultStrokeColor: 'blue',
  defaultStrokeOpacity: 1,
  defaultStrokeWidth: 1,
}`

const barConfigCanvasLevel: string = `const configCanvasLevel: QsBarConfig = {
  defaultFillColor: 'blue',
}`

const areaConfig1: string = `const config1: QsAreaConfig = {
  defaultFillColor: 'orange',
  defaultStrokeColor: 'orange',
}`

const barConfig1: string = `const config1: QsBarConfig = {
  defaultFillColor: 'orange',
}`

const areaData1: string = `const data1: QsAreaData = {
  highValues: [
    50, 50, 30, 20, 70, 60, 70, 60, 50, 112, 10, 10,
  ],
  strokeColor: 'red',
  strokeWidth: 3,
}`

const barData1: string = `const data1: QsBarData[] = [
  { upperBoundry: 35, fillColor: 'red' },
  { upperBoundry: 40 },
  { upperBoundry: 40 },
  { upperBoundry: 40 },
  { upperBoundry: 40 },
  { upperBoundry: 40 },
  { upperBoundry: 40 },
  { upperBoundry: 40 },
]`

export const configContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              Default configuration
            </Typography>,
            <Typography variant="body1">
              Broadly speaking when it comes to configuration there are two
              types of element that need to be considered. Those which draw the
              data as one item, such as an area, and those which draw the data
              as multiple items, such as bars. For this reason it is possible to
              apply configuration at canvas level and/or at element level.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    An area element with default configuration
                  </Typography>
                  <ContentCodeBox code={mutliAreaCodeNoConfig} />
                </ContentTextBox>,
                <ContentChartBox>
                  <AreaConfigDemoChart chartName={`areaNoConfig`} />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    A bars element with default configuration
                  </Typography>
                  <ContentCodeBox code={mutliBarCodeNoConfig} />
                </ContentTextBox>,
                <ContentChartBox>
                  <BarColorDemoChart chartName={`barNoConfig`} />
                </ContentChartBox>,
              ]}
            />,
          ]}
        />

        <ContentColumn
          elements={[
            <ContentTitle key="title" variant="h4">
              Canvas level configuration
            </ContentTitle>,
            <Typography variant="body1">
              Configuration at canvas level will apply the config to all
              elements of that type.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Area configured at canvas level. Depending upon the data
                    being displayed, this may be sufficient
                  </Typography>
                  <ContentCodeBox code={areaConfigCanvasLevel} />
                  <ContentCodeBox code={mutliAreaCodeConfigCanvasLevel} />
                </ContentTextBox>,
                <ContentChartBox>
                  <MultiAreaConfigDemoChart
                    chartName={`multiArea1`}
                    configCanvasLevel={{
                      defaultFillColor: 'blue',
                      defaultFillOpacity: 0.1,
                      defaultStrokeColor: 'blue',
                      defaultStrokeOpacity: 1,
                      defaultStrokeWidth: 1,
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Bars configured at canvas level. Depending upon the data
                    being displayed, this may be sufficient
                  </Typography>
                  <ContentCodeBox code={barConfigCanvasLevel} />
                  <ContentCodeBox code={mutliBarCodeConfigCanvasLevel} />
                </ContentTextBox>,
                <ContentChartBox>
                  <MultiBarConfigDemoChart
                    chartName={`multiBar1`}
                    configCanvasLevel={{ defaultFillColor: 'blue' }}
                  />
                </ContentChartBox>,
              ]}
            />,
          ]}
        />

        <ContentColumn
          elements={[
            <ContentTitle key="title" variant="h4">
              Element level configuration
            </ContentTitle>,
            <Typography variant="body1">
              Configuring elements at canvas level will not always be enough. A
              good data visualisation requires the data to be as clear as
              possible, for this reason it is possible to apply configuration at
              element level.
            </Typography>,
            <ContentRow
              elements={[
                <ContentColumn
                  elements={[
                    <Typography variant="body1">
                      Which area is which?
                    </Typography>,
                    <MultiAreaConfigDemoChart
                      chartName={`multiArea2`}
                      configCanvasLevel={{
                        defaultFillColor: 'blue',
                        defaultFillOpacity: 0.1,
                        defaultStrokeColor: 'blue',
                        defaultStrokeOpacity: 1,
                        defaultStrokeWidth: 1,
                      }}
                      data1={{
                        highValues: [
                          50, 50, 30, 20, 70, 60, 70, 60, 50, 112, 10, 10,
                        ],
                      }}
                    />,
                  ]}
                />,
                <ContentColumn
                  elements={[
                    <Typography variant="body1">
                      Is this two sets of bars?
                    </Typography>,
                    <MultiBarConfigDemoChart
                      chartName={`multiBar2`}
                      configCanvasLevel={{ defaultFillColor: 'blue' }}
                      data1={[
                        { upperBoundry: 40 },
                        { upperBoundry: 40 },
                        { upperBoundry: 40 },
                        { upperBoundry: 40 },
                        { upperBoundry: 40 },
                        { upperBoundry: 40 },
                        { upperBoundry: 40 },
                        { upperBoundry: 40 },
                      ]}
                    />,
                  ]}
                />,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Changes to config at element level override config at canvas
                    level
                  </Typography>
                  <ContentCodeBox code={areaConfigCanvasLevel} />
                  <ContentCodeBox code={areaConfig1} />
                  <ContentCodeBox code={mutliAreaCodeConfigElementLevel} />
                </ContentTextBox>,
                <ContentChartBox>
                  <MultiAreaConfigDemoChart
                    chartName={`multiArea3`}
                    configCanvasLevel={{
                      defaultFillColor: 'blue',
                      defaultFillOpacity: 0.1,
                      defaultStrokeColor: 'blue',
                      defaultStrokeOpacity: 1,
                      defaultStrokeWidth: 1,
                    }}
                    data1={{
                      highValues: [
                        50, 50, 30, 20, 70, 60, 70, 60, 50, 112, 10, 10,
                      ],
                    }}
                    config1={{
                      defaultFillColor: 'orange',
                      defaultStrokeColor: 'orange',
                    }}
                  />
                  ,
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Changes to config at element level override config at canvas
                    level
                  </Typography>
                  <ContentCodeBox code={barConfigCanvasLevel} />
                  <ContentCodeBox code={barConfig1} />
                  <ContentCodeBox code={mutliBarCodeConfigElementLevel} />
                </ContentTextBox>,
                <ContentChartBox>
                  <MultiBarConfigDemoChart
                    chartName={`multiBar3`}
                    configCanvasLevel={{ defaultFillColor: 'blue' }}
                    config1={{
                      defaultFillColor: 'orange',
                    }}
                    data1={[
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                    ]}
                  />
                </ContentChartBox>,
              ]}
            />,
          ]}
        />

        <ContentColumn
          elements={[
            <ContentTitle key="title" variant="h4">
              Changing the appearance of elements at data level
            </ContentTitle>,
            <Typography variant="body1">
              Sometimes an element can be significant in terms of the data it
              represents, for this reason it is possible to change the
              appearance of an element when supplying data.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Settings at data level override any config
                  </Typography>
                  <ContentCodeBox code={areaConfigCanvasLevel} />
                  <ContentCodeBox code={areaConfig1} />
                  <ContentCodeBox code={areaData1} />
                  <ContentCodeBox code={mutliAreaCodeConfigElementLevel} />
                </ContentTextBox>,
                <ContentChartBox>
                  <MultiAreaConfigDemoChart
                    chartName={`multiArea4`}
                    configCanvasLevel={{
                      defaultFillColor: 'blue',
                      defaultFillOpacity: 0.1,
                      defaultStrokeColor: 'blue',
                      defaultStrokeOpacity: 1,
                      defaultStrokeWidth: 1,
                    }}
                    data1={{
                      highValues: [
                        50, 50, 30, 20, 70, 60, 70, 60, 50, 112, 10, 10,
                      ],
                      strokeColor: 'red',
                      strokeWidth: 3,
                    }}
                    config1={{
                      defaultFillColor: 'orange',
                      defaultStrokeColor: 'orange',
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Settings at data level override any config
                  </Typography>
                  <ContentCodeBox code={barConfigCanvasLevel} />
                  <ContentCodeBox code={barConfig1} />
                  <ContentCodeBox code={barData1} />
                  <ContentCodeBox code={mutliBarCodeConfigElementLevel} />
                </ContentTextBox>,
                <ContentChartBox>
                  <MultiBarConfigDemoChart
                    chartName={`multiBar4`}
                    configCanvasLevel={{ defaultFillColor: 'blue' }}
                    config1={{
                      defaultFillColor: 'orange',
                    }}
                    data1={[
                      { upperBoundry: 35, fillColor: 'red' },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                      { upperBoundry: 40 },
                    ]}
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

const barsCodeNoConfig: string = ` const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
  chartName: \`textEnumDemo\${chartName}\`,
  height: 300,
  width: 500,
  highestViewableValue: 35,
})
canvas.generate.orthogonal.horizontal.bars(data)
canvas.generate.orthogonal.vertical.axis.left()`

const barsCode: string = ` const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
  chartName: \`textEnumDemo\${chartName}\`,
  height: 300,
  width: 500,
  highestViewableValue: 35,
})
canvas.generate.orthogonal.horizontal.bars(data, config)
canvas.generate.orthogonal.vertical.axis.left()`

const configDefaultColour: string = `const config: QsBarConfig = {
  defaultFillColor: 'blue',
}`

const configDefaultStrokeColour: string = `const config: QsBarConfig = {
  defaultFillColor: 'blue',
  defaultStrokeColor: 'red',
  defaultStrokeWidth: 1,
  defaultStrokeOpacity: 1,
}`

const configSequentialScale: string = `const config: QsBarConfig = {
  defaultFillColor: 'blue',
  fillColorScaleData: {
    domain: [1, 35],
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.SEQUENTIAL,
  },
}`

const configOrdinalScale: string = `const config: QsBarConfig = {
  defaultFillColor: 'blue',
  fillColorScaleData: {
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.ORDINAL,
  },
}`

const dataWithColour: string = `const data: QsBarData[] = [
  { upperBoundry: 35, fillColor: 'lightGreen' },
  { upperBoundry: 35, fillColor: 'lightGreen' },
  { upperBoundry: 30 },
  { upperBoundry: 25 },
  { upperBoundry: 20 },
  { upperBoundry: 15 },
  { upperBoundry: 10 },
  { upperBoundry: 5, fillColor: 'red' },
]`

export const colorConfigContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <Typography key="title" variant="h4">
              More about colors
            </Typography>,
            <Typography>
              Changing color in configuration is primarily aimed at being used
              for aesthetic purposes, therefore has a lower order of precidence
              than color intended to represent data.
            </Typography>,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    This is the default appearance of bars.
                  </Typography>
                  <ContentCodeBox code={barsCodeNoConfig} />
                </ContentTextBox>,
                <ContentChartBox>
                  <BarColorDemoChart chartName={`noConfig`} />,
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    This is the application of defaultColor in configuration.
                    This is purely aesthetic and does not change the way in
                    which the data is presented.
                  </Typography>
                  <ContentCodeBox code={configDefaultColour} />
                  <ContentCodeBox code={barsCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <BarColorDemoChart
                    chartName={`defaultColor`}
                    config={{
                      defaultFillColor: 'blue',
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    It is possible to change the stroke in the same way as fill.
                    From here only fill will be used to demonstrate color use.
                  </Typography>
                  <ContentCodeBox code={configDefaultStrokeColour} />
                  <ContentCodeBox code={barsCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <BarColorDemoChart
                    chartName={`defaultStrokeColor`}
                    config={{
                      defaultFillColor: 'blue',
                      defaultStrokeColor: 'red',
                      defaultStrokeWidth: 1,
                      defaultStrokeOpacity: 1,
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Some elements such as bars have the option to configure
                    color scales. Here 'fillColorScaleData' option is used to
                    assign colors to bars with an 'ordinal' scale. Scaled colors
                    can represent data so 'defaultFillColor' is overridden when
                    using 'fillColorScaleData'.
                  </Typography>
                  <ContentCodeBox code={configOrdinalScale} />
                  <ContentCodeBox code={barsCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <BarColorDemoChart
                    chartName={`fillColorScaleOrdinal`}
                    config={{
                      defaultFillColor: 'blue',
                      fillColorScaleData: {
                        range: ['lightblue', 'darkblue'],
                        type: QsEnumColorScale.ORDINAL,
                      },
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    While an 'ordinal' scale is purely aesthetic a 'sequential'
                    scale changes color based on data.
                  </Typography>
                  <ContentCodeBox code={configSequentialScale} />
                  <ContentCodeBox code={barsCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <BarColorDemoChart
                    chartName={`fillColorScaleSequential`}
                    config={{
                      defaultFillColor: 'blue',
                      fillColorScaleData: {
                        domain: [1, 35],
                        range: ['lightblue', 'darkblue'],
                        type: QsEnumColorScale.SEQUENTIAL,
                      },
                    }}
                  />
                </ContentChartBox>,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Finally color can be specified as part of the data. This
                    will override 'defaultFillColor' and 'fillColorScaleData'.
                  </Typography>
                  <ContentCodeBox code={configSequentialScale} />
                  <ContentCodeBox code={dataWithColour} />
                  <ContentCodeBox code={barsCode} />
                </ContentTextBox>,
                <ContentChartBox>
                  <BarColorDemoChartWithData
                    chartName={`fillColorScaleSequentialWithData`}
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
