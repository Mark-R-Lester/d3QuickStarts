import { Typography } from '@mui/material'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentColumn } from '../../components/atoms/content/ContentColumn'
import { ContentRow } from '../../components/atoms/content/ContentRow'
import { SimpleCanvas } from './SimpleCanvas'
import { SimpleCanvasWithArea } from './SimpleCanvasWithArea'
import {
  ContentBox,
  ContentSyntaxBox,
  ContentTextBox,
  ContentTitle,
} from '../../components/atoms/content/ContentStyled'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { ChartEditor } from '../../components/molecules/ChartEditor'

const areaDataAsString: string = `qsCreateCanvas(canvasConfig)
const data: QsAreaData = {
  higherData: [100, 100],
}
canvas.generate.linear.horizontal.area(data)
canvas.generate.linear.vertical.axis.left([0, 100])
canvas.generate.linear.horizontal.axis.bottom(['0', '1'])`

const canvasConfig: string = `canvasConfig: QsCanvasConfig = {
  chartName: 'simpleCanvas',
  width: 130,
  highestViewableValue: 100,
  borderColor: 'black',
}

qsCreateCanvas(canvasConfig)`

const qsCanvasConfig: string = `export interface QsCanvasConfig {
  [key: string]: string | number | undefined
  chartName: string
  width?: number
  height?: number
  marginRight?: number
  marginLeft?: number
  marginTop?: number
  marginBottom?: number
  highestViewableValue: number
  lowestViewableValue?: number
  borderColor?: string
}`

const canvasConfig1: string = `const canvasConfig =  QsCanvasConfig {
  chartName: 'chart1',
  width: 800,
  highestViewableValue: 100,
  borderColor: 'black'
}`

const canvasConfig2: string = `const canvasConfig =  QsCanvasConfig {
  chartName: 'chart2',
  width: 800,
  height: 250,
  highestViewableValue: 100,
  borderColor: 'black'
}`

const canvasConfig3: string = `const canvasConfig: QsCanvasConfig = {
  chartName: 'chart2',
  width: 800,
  height: 250,
  lowestViewableValue: -10,
  highestViewableValue: 110,
  borderColor: 'black'
}`

const canvasConfig4: string = `const canvasConfig: QsCanvasConfig = {
  chartName: 'chart4',
  width: 800,
  height: 400,
  marginRight: 45,
  marginLeft: 45,
  marginTop: 45,
  marginBottom: 45,
  lowestViewableValue: 0,
  highestViewableValue: 100,
  borderColor: 'black',
}`

export const blankCanvasContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">A blank canvas</ContentTitle>,
      <ContentBox>
        <Typography variant="body1">
          By default the canvas does not have a border. When working with charts
          it is often useful to be able to see the edges of the canvas. Without
          the border, here the canvas would be invisible.
        </Typography>
      </ContentBox>,
      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">
                    This is a canvas created with minimal configuration and no
                    visual elements
                  </Typography>
                </ContentTextBox>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers={true}
                  >
                    {canvasConfig}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            ></ContentRow>,
            <SimpleCanvas
              canvasProps={{
                chartName: 'chart',
                width: 800,
                lowestViewableValue: 0,
                highestViewableValue: 100,
                borderColor: 'black',
              }}
            />,
          ]}
        ></ContentColumn>
      </ContentBox>,
    ]}
  ></ContentColumn>
)

export const canvasWithVisibleDisplayArea: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">The canvas display area</ContentTitle>,
      <ContentBox>
        <Typography variant="body1">
          Every canvas has a display area. The display area is where the data is
          visualised when adding elements. To allow us to see the display area,
          we've completely filled it with a linear area element. So you can see
          the effects of changes to the canvas config axes have also beeen
          added.
        </Typography>
      </ContentBox>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentTextBox>
              <Typography variant="body1">
                The code: The area has two points set both at 100 The lower data
                points if not provided default to 0.
              </Typography>
              <Typography variant="body1">
                The vertical axis uses a linear scale to automatically calculate
                what is displayed against the ticks.
              </Typography>
              <Typography variant="body1">
                The horizontal axis uses a point scale and will only ever show
                the data provided
              </Typography>
            </ContentTextBox>,
            <ContentSyntaxBox>
              <SyntaxHighlighter
                language="typescript"
                style={atomOneDark}
                showLineNumbers={true}
              >
                {areaDataAsString}
              </SyntaxHighlighter>
            </ContentSyntaxBox>,
          ]}
        ></ContentRow>
      </ContentBox>,
      <ContentTitle variant="h5">
        chartName, height and highestViewableValue
      </ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">
                    The chartName is mandatory and is used to identify the div
                    with a coresponding id.
                  </Typography>
                  <Typography variant="body1">
                    <code>&lt;div id=chart1 /&gt;</code>
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    By default the height is 70% of the width. Provided this
                    ratio is what you need you only ever need to change the
                    width.
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    The highestViewableValue is mandatory. If you want to see
                    the highest values in your data set highestViewableValue to
                    at least as high as your highest value
                  </Typography>
                </ContentTextBox>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers={true}
                  >
                    {canvasConfig1}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            ></ContentRow>,
            <SimpleCanvasWithArea
              canvasProps={{
                chartName: 'chart1',
                width: 800,
                highestViewableValue: 100,
                borderColor: 'black',
              }}
            />,
          ]}
        />
      </ContentBox>,
      <ContentTitle variant="h5">width and height</ContentTitle>,

      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">
                    When supplying the width and height you can have a
                    rectangular area with whatever dimentions you want
                  </Typography>
                </ContentTextBox>,
                <ContentSyntaxBox>
                  {' '}
                  <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers={true}
                  >
                    {canvasConfig2}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            ></ContentRow>,
            <SimpleCanvasWithArea
              canvasProps={{
                chartName: 'chart2',
                width: 800,
                height: 250,
                highestViewableValue: 100,
                borderColor: 'black',
              }}
            />,
          ]}
        />
      </ContentBox>,

      <ContentTitle variant="h5">
        lowestViewableValue and highestViewableValue
      </ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">
                    The values in lowestViewableValue and highestViewableValue
                    can drastically change how the data is displayed
                  </Typography>
                </ContentTextBox>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers={true}
                  >
                    {canvasConfig3}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            ></ContentRow>,
            <SimpleCanvasWithArea
              canvasProps={{
                chartName: 'chart3',
                width: 800,
                height: 250,
                lowestViewableValue: -10,
                highestViewableValue: 110,
                borderColor: 'black',
              }}
            />,
          ]}
        />
      </ContentBox>,

      <ContentTitle variant="h5">The margins</ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">
                    The margins determine the space around the data
                    visualisation. Here every margin is set to 45. The value
                    given is a percentage of the canvas width or height
                    depending on which margin is being set. The result here is
                    that the data visualisation only occupies 10% of the height
                    and 10% of the width.
                  </Typography>
                </ContentTextBox>,
                <ContentSyntaxBox>
                  {' '}
                  <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers={true}
                  >
                    {canvasConfig4}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            ></ContentRow>,
            <SimpleCanvasWithArea
              canvasProps={{
                chartName: 'chart4',
                width: 800,
                height: 250,
                marginRight: 45,
                marginLeft: 45,
                marginTop: 45,
                marginBottom: 45,
                lowestViewableValue: 0,
                highestViewableValue: 100,
                borderColor: 'black',
              }}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  ></ContentColumn>
)

export const configAndData: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">QsCanvasConfig</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">Interface:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {qsCanvasConfig}
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
                    {canvasConfig4}
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
    height: 300,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    lowestViewableValue: 0,
    highestViewableValue: 100,
    borderColor: 'black',
  }
  const data: QsAreaData = {
    higherData: [100, 100],
  }
  const canvas: QsCanvas = qsCreateCanvas(canvasConfig)
  canvas.generate.linear.horizontal.area(data)
  canvas.generate.linear.vertical.axis.left([])
  canvas.generate.linear.horizontal.axis.bottom([])
`}
  />
)
