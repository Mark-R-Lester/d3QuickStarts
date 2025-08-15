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

export const configContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3">
        How to use configuration
      </ContentTitle>,

      <ContentBox>
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
                  <Typography> </Typography>
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
                    assign colors to bars with an 'oridinal' scale. Scaled
                    colors can represent data so 'defaultFillColor' is
                    overridden when using 'fillColorScaleData'.
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
                    While an 'ordinal' scale is purely aesthetic a 'squential'
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
