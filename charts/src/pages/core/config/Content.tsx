import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import {
  ContentBox,
  ContentSyntaxBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import { BarColorDemoChart } from './BarColorDemoChart'
import { QsEnumColorScale } from 'd3qs/d3QuickStart'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { BarColorDemoChartWithData } from './BarColorDemoChartWithData'
import { AreaConfigDemoChart } from './AreaConfigDemoChart'
import { MultiAreaConfigDemoChart } from './MultiAreaConfigDemoChart'
import { MultiBarConfigDemoChart } from './MultiBarConfigDemoChart'

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
  higherData: [
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
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {mutliAreaCodeNoConfig}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <ContentColumn
                  elements={[
                    <AreaConfigDemoChart chartName={`areaNoConfig`} />,
                  ]}
                />,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    A bars element with default configuration
                  </Typography>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {mutliBarCodeNoConfig}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <ContentColumn
                  elements={[<BarColorDemoChart chartName={`barNoConfig`} />]}
                />,
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
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {areaConfigCanvasLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {mutliAreaCodeConfigCanvasLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <ContentColumn
                  elements={[
                    <MultiAreaConfigDemoChart
                      chartName={`multiArea1`}
                      configCanvasLevel={{
                        defaultFillColor: 'blue',
                        defaultFillOpacity: 0.1,
                        defaultStrokeColor: 'blue',
                        defaultStrokeOpacity: 1,
                        defaultStrokeWidth: 1,
                      }}
                    />,
                  ]}
                />,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Bars configured at canvas level. Depending upon the data
                    being displayed, this may be sufficient
                  </Typography>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {barConfigCanvasLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {mutliBarCodeConfigCanvasLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <ContentColumn
                  elements={[
                    <MultiBarConfigDemoChart
                      chartName={`multiBar1`}
                      configCanvasLevel={{ defaultFillColor: 'blue' }}
                    />,
                  ]}
                />,
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
                        higherData: [
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
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {areaConfigCanvasLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {areaConfig1}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {mutliAreaCodeConfigElementLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <ContentColumn
                  elements={[
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
                        higherData: [
                          50, 50, 30, 20, 70, 60, 70, 60, 50, 112, 10, 10,
                        ],
                      }}
                      config1={{
                        defaultFillColor: 'orange',
                        defaultStrokeColor: 'orange',
                      }}
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
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {barConfigCanvasLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {barConfig1}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {mutliBarCodeConfigElementLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <ContentColumn
                  elements={[
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
                    />,
                  ]}
                />,
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
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {areaConfigCanvasLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {areaConfig1}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {areaData1}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {mutliAreaCodeConfigElementLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <ContentColumn
                  elements={[
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
                        higherData: [
                          50, 50, 30, 20, 70, 60, 70, 60, 50, 112, 10, 10,
                        ],
                        strokeColor: 'red',
                        strokeWidth: 3,
                      }}
                      config1={{
                        defaultFillColor: 'orange',
                        defaultStrokeColor: 'orange',
                      }}
                    />,
                  ]}
                />,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Settings at data level override any config
                  </Typography>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {barConfigCanvasLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {barConfig1}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {barData1}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {mutliBarCodeConfigElementLevel}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <ContentColumn
                  elements={[
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
                    />,
                  ]}
                />,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

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

const dataWithColour: string = `const data: QsBarData[] = [
  { upperBoundry: 35, fillColor: 'lightGreen' },
  { upperBoundry: 35, fillColor: 'lightGreen' },
  { upperBoundry: 30 },
  { upperBoundry: 25 },
  { upperBoundry: 20 },
  { upperBoundry: 15 },
  { upperBoundry: 10 },
  { upperBoundry: 5, fillColor: 'red' },
]
  
`

const configOrdinalScale: string = `const config: QsBarConfig = {
  defaultFillColor: 'blue',
  fillColorScaleData: {
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.ORDINAL,
  },
}`

export const dataContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3">
        How configuration with data
      </ContentTitle>,

      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Changing color in configuration is designed to be purely for
                    aesthetic purposes and therefore has a lower order of
                    precidence than color intended to represent data.
                  </Typography>
                  <Typography>
                    This is the default appearance of bars.
                  </Typography>
                </ContentTextBox>,
                <BarColorDemoChart chartName={`noConfig`} />,
              ]}
            />,

            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Changing color in configuration is designed to be purely for
                    aesthetic purposes and therefore has a lower order of
                    precidence than color intended to represent data.
                  </Typography>
                  <Typography>
                    This is the default appearance of bars.
                  </Typography>
                </ContentTextBox>,
                <BarColorDemoChart chartName={`noConfig`} />,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)
export const colorConfigContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3"></ContentTitle>,

      <ContentBox>
        <Typography variant="h5" paddingBottom="20px">
          Sometimes color is aesthetic. Sometimes it's data.
        </Typography>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Changing color in configuration is primarily aimed at being
                    used for aesthetic purposes, therefore has a lower order of
                    precidence than color intended to represent data.
                  </Typography>
                  <br />
                  <Typography>
                    This is the default appearance of bars.
                  </Typography>
                </ContentTextBox>,
                <BarColorDemoChart chartName={`noConfig`} />,
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
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {configDefaultColour}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <BarColorDemoChart
                  chartName={`defaultColor`}
                  config={{
                    defaultFillColor: 'blue',
                  }}
                />,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    It is possible to change the stroke in the same way as fill.
                    From here only fill will be used to demonstrate color use.
                  </Typography>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {configDefaultStrokeColour}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <BarColorDemoChart
                  chartName={`defaultStrokeColor`}
                  config={{
                    defaultFillColor: 'blue',
                    defaultStrokeColor: 'red',
                    defaultStrokeWidth: 1,
                    defaultStrokeOpacity: 1,
                  }}
                />,
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
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {configOrdinalScale}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <BarColorDemoChart
                  chartName={`fillColorScaleOrdinal`}
                  config={{
                    defaultFillColor: 'blue',
                    fillColorScaleData: {
                      range: ['lightblue', 'darkblue'],
                      type: QsEnumColorScale.ORDINAL,
                    },
                  }}
                />,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    While an 'ordinal' scale is purely aesthetic a 'sequential'
                    scale changes color based on data.
                  </Typography>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {configSequentialScale}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
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
                />,
              ]}
            />,
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography>
                    Finally color can be specified as part of the data. This
                    will override 'defaultFillColor' and 'fillColorScaleData'.
                  </Typography>
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {`${dataWithColour}${configSequentialScale}`}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <BarColorDemoChartWithData
                  chartName={`fillColorScaleSequentialWithData`}
                />,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)
