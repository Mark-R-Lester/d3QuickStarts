import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { orthogonalGradientContent, radialGradientContent } from './Content'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { SingleWord } from '../../../components/atoms/chart/SingleWord'
import { useSearchParams } from 'react-router-dom'
import { SubPage, SubPageTarget } from '../../../components/atoms/links'

export default function GradientPage() {
  const [searchParams] = useSearchParams()
  const subPage = searchParams.get('subPage') || SubPage.ORTHOGONAL_GRADIENT

  const menuElements: JSX.Element[] = [
    <SingleWord chartName="text" text="Orthogonal" />,
    <SingleWord chartName="color" text="Radial" />,
  ]

  const contents: JSX.Element[] = [
    orthogonalGradientContent,
    radialGradientContent,
  ]

  const subPageIndex = [
    SubPageTarget.ORTHOGONAL_GRADIENT,
    SubPageTarget.RADIAL_GRADIENT,
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
        Gradients
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
