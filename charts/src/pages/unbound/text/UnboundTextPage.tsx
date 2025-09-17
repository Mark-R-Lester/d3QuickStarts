import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { UnboundTextChart } from './UnboundTextChart'
import { defaultsContent, configAndData, editorContent } from './Content'

export default function UnboundTextPage() {
  const menuElements: JSX.Element[] = [
    <UnboundTextChart
      canvasConfig={{
        chartName: 'unboundText',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 10,
        marginLeft: 30,
      }}
    />,
    <ConfigAndData />,
    <TryItYourSelf />,
  ]

  const contents: JSX.Element[] = [
    defaultsContent,
    configAndData,
    editorContent,
  ]
  const [content, setContent] = useState<JSX.Element>(contents[0])
  const onClick = (index: number) => {
    setContent(contents[index])
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Unbound Text
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
