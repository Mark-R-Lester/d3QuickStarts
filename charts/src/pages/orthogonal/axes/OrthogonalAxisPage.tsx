import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { OrthogonalAxisChart } from './AxisConfigChart'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import {
  defaultsContent,
  configContent,
  configAndData,
  editorContent,
} from './Content'
import { AxiesDefaultsChart } from './AxesDefaultsChart'

export default function OrthogonalAxisPage() {
  const menuElements: JSX.Element[] = [
    <AxiesDefaultsChart
      canvasProps={{
        chartName: 'orthogonalAxis',
        width: 130,
        highestViewableValue: 200,
      }}
    />,
    <OrthogonalAxisChart
      canvasProps={{
        chartName: 'orthogonalAxis2',
        width: 130,
        highestViewableValue: 200,
      }}
    />,

    <ConfigAndData />,
    <TryItYourSelf />,
  ]

  const contents: JSX.Element[] = [
    defaultsContent,
    configContent,
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
        orthogonal Axis
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
