import { Typography } from '@mui/material'
import { useState } from 'react'
import { ConfigAndData } from '../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../components/atoms/chart/TryItYourSelf'
import { ChartButtonGrid } from '../../components/molecules/ChartButtonGrid'
import { SimpleCanvas } from './SimpleCanvas'
import { SimpleCanvasWithArea } from './SimpleCanvasWithArea'
import {
  blankCanvasContent,
  canvasWithVisibleDisplayArea,
  configAndData,
  editorContent,
} from './Content'

export default function CanvasPage() {
  const menuElements: JSX.Element[] = [
    <SimpleCanvas
      canvasProps={{
        chartName: 'simpleCanvas',
        width: 130,
        highestViewableValue: 100,
      }}
    />,
    <SimpleCanvasWithArea
      canvasProps={{
        chartName: 'simpleCanvasWithArea',
        width: 130,
        highestViewableValue: 100,
      }}
    />,
    <ConfigAndData />,
    <TryItYourSelf />,
  ]

  const contents: JSX.Element[] = [
    blankCanvasContent,
    canvasWithVisibleDisplayArea,
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
        Canvas
      </Typography>
      <ChartButtonGrid
        elements={menuElements}
        onClick={onClick}
      ></ChartButtonGrid>
      {content}
    </>
  )
}
