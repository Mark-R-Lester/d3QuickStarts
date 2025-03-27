import { Box, Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { EnumOrientation } from '../../common/enums'
import { LinearBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsElement'
import { LinearFloatingBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsFloatingElement'
import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentContainer } from './ListContainer'

export default function LinearBarsPage() {
  const menuElements: JSX.Element[] = [
    <LinearBarsElement
      chartName="linearHorizontalBarsMenu"
      chartWidth={130}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearHorizontalBarsFloatingMenu"
      chartWidth={130}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearBarsElement
      chartName="linearVerticalBarsMenu"
      chartWidth={130}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearVerticalBarsFloatingMenu"
      chartWidth={130}
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  const elements: JSX.Element[] = [
    <LinearBarsElement
      chartName="linearHorizontalBars"
      chartWidth={800}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearHorizontalBarsFloating"
      chartWidth={600}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearBarsElement
      chartName="linearVerticalBars"
      chartWidth={600}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearVerticalBarsFloating"
      chartWidth={600}
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  const [chart, setChart] = useState<JSX.Element>(elements[0])
  const snipet: string =
    'const onClick = (index: number) => {\n    setChart(elements[index])\n}'

  const content: JSX.Element[] = [
    <Typography variant="body1">Linear Bars are here to stay </Typography>,

    <SyntaxHighlighter language="typescript" style={atomOneDark}>
      {snipet}
    </SyntaxHighlighter>,

    <Box>{chart}</Box>,
  ]

  const onClick = (index: number) => {
    setChart(elements[index])
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Bars
      </Typography>
      <ElementGrid elements={menuElements} onClick={onClick}></ElementGrid>
      <ContentContainer elements={content}></ContentContainer>
    </>
  )
}
