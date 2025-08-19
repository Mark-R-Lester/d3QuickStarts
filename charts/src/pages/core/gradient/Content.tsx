import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import {
  ContentBox,
  ContentChartBox,
  ContentSyntaxBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import { RadialAreaGradientDemoChart } from './RadialAreaGradientDemoChart'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { AreaConfigDemoChart } from './AreaGradientDemoChart'

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

const areaCodeNoConfig: string = getCodeSample('area', '160')
const barCodeNoConfig: string = getCodeSample('bars', '80')

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
                      {areaCodeNoConfig}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
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
                  <ContentSyntaxBox>
                    <SyntaxHighlighter
                      language="typescript"
                      style={atomOneDark}
                      showLineNumbers={true}
                    >
                      {barCodeNoConfig}
                    </SyntaxHighlighter>
                  </ContentSyntaxBox>
                </ContentTextBox>,
                <ContentChartBox>
                  <RadialAreaGradientDemoChart
                    chartName={`radialAreaGradient`}
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
