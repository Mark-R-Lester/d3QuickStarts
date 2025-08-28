import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { EnumOrientation } from '../../../common/enums'

import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { OrthogonalPointsChart } from './OrthogonalPointsChart'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { configAndData, defaultsContent, editorContent } from './Content'

export default function OrthogonalPointsPage() {
  const menuElements: JSX.Element[] = [
    <OrthogonalPointsChart
      canvasConfig={{
        chartName: 'orthogonalPointsChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.VERTICAL}
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
        Orthogonal Points
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
