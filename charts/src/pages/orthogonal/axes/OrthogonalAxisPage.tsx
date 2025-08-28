import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { OrthogonalAxisChart } from './AxisConfigChart'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { defaultsContent, configAndData, editorContent } from './Content'
import { SingleWord } from '../../../components/atoms/chart/SingleWord'

export default function OrthogonalAxisPage() {
  const menuElements: JSX.Element[] = [
    <OrthogonalAxisChart
      canvasConfig={{
        chartName: 'orthogonalAxis',
        width: 130,
        highestViewableValue: 200,
      }}
    />,
    <SingleWord chartName={'config'} text={'Config'} />,
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
