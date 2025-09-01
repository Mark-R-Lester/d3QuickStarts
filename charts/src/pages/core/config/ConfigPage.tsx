import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { colorConfigContent, configContent } from './Content'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { SingleWord } from '../../../components/atoms/chart/SingleWord'
import { useSearchParams } from 'react-router-dom'
import { SubPage, SubPageTarget } from '../../../components/atoms/links'

export default function ColorPage() {
  const [searchParams] = useSearchParams()
  const subPage = searchParams.get('subPage') || SubPage.BASIC

  const menuElements: JSX.Element[] = [
    <SingleWord chartName="text" text="Config" />,
    <SingleWord chartName="color" text="Color" />,
  ]

  const contents: JSX.Element[] = [configContent, colorConfigContent]
  const subPageIndex = [
    SubPageTarget.BASIC,
    SubPageTarget.COLOR_CONFIG,
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
        Working with configuration and data
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
