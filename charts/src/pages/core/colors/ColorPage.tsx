import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { textEnumContent } from './Content'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { SingleWord } from '../../../components/atoms/chart/SingleWord'

export default function ColorPage() {
  const menuElements: JSX.Element[] = [
    <SingleWord chartName="text" text="Text" />,
    <SingleWord chartName="line" text="Line" />,
    <SingleWord chartName="color" text="Color" />,
  ]

  const contents: JSX.Element[] = [textEnumContent]
  const [content, setContent] = useState<JSX.Element>(contents[0])
  const onClick = (index: number) => {
    setContent(contents[index])
  }

  return (
    <>
      <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
        Working with colors
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
