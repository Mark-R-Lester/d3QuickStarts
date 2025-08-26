import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { EnumOrientation } from '../../../common/enums'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { OrthogonalLineDefaultsChart } from './OrthogonalLineDefaultsChart'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { configAndData, defaultsContent, editorContent } from './Content'

export default function OrthogonalLinePage() {
  const menuElements: JSX.Element[] = [
    <OrthogonalLineDefaultsChart
      canvasConfig={{
        chartName: 'orthogonalLineHorizontal',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
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
        orthogonal Line
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
