import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { textEnumContent, lineEnumContent, colorEnumContent } from './Content'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { SingleWord } from '../../../components/atoms/chart/SingleWord'
import { SubPage, SubPageTarget } from '../../../components/atoms/links'
import { useSearchParams } from 'react-router-dom'

export default function EnumPage() {
  const [searchParams] = useSearchParams()
  const subPage = searchParams.get('subPage') || SubPage.TEXT_ENUM

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

  const subPageIndex = [
    SubPageTarget.TEXT_ENUM,
    SubPageTarget.LINE_ENUM,
    SubPageTarget.COLOR_ENUM,
  ].indexOf(subPage)
  const [content, setContent] = useState<JSX.Element>(
    contents[subPageIndex >= 0 ? subPageIndex : 0]
  )

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
