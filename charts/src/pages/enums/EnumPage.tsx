import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { textEnumContent, lineEnumContent, colorEnumContent } from './Content'
import { ChartButtonGrid } from '../../components/molecules/ChartButtonGrid'
import { SingleWord } from '../../components/atoms/chart/SingleWord'

export default function OrthogonalAreaPage() {
  const menuElements: JSX.Element[] = [
    <SingleWord chartName="text" text="Text" />,
    <SingleWord chartName="line" text="Line" />,
    <SingleWord chartName="color" text="Color" />,
  ]

  const contents: JSX.Element[] = [
    textEnumContent,
    lineEnumContent,
    colorEnumContent,
  ]
  const [content, setContent] = useState<JSX.Element>(contents[0])
  const onClick = (index: number) => {
    setContent(contents[index])
  }

  return (
    <>
      <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
        QsEnums
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
