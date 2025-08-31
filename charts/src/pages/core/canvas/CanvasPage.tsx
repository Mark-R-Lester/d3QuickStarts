import { Typography } from '@mui/material'
import { useState } from 'react'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import {
  configAndData,
  basic,
  editor,
  orthogonal,
  radial,
  plotted,
} from './Content'
import { useSearchParams } from 'react-router-dom'
import { SubPage, SubPageTarget } from '../../../components/atoms/links'
import { SingleWord } from '../../../components/atoms/chart/SingleWord'

export default function CanvasPage() {
  const [searchParams] = useSearchParams()
  const subPage = searchParams.get('subPage') || SubPage.BASIC

  const menuElements: JSX.Element[] = [
    <SingleWord chartName="basic" text="Basics" />,
    <SingleWord chartName="orthononal" text="Orthononal" />,
    <SingleWord chartName="radial" text="Radial" />,
    <SingleWord chartName="plotted" text="Plotted" />,
    <SingleWord chartName="config" text="Config" />,
    <TryItYourSelf />,
  ]

  const contents: JSX.Element[] = [
    basic,
    orthogonal,
    radial,
    plotted,
    configAndData,
    editor,
  ]
  const subPageIndex = [
    SubPageTarget.BASIC,
    SubPageTarget.ORTHOGONAL,
    SubPageTarget.RADIAL,
    SubPageTarget.PLOTTED,
    SubPageTarget.CONFIG,
    SubPageTarget.EDITOR,
  ].indexOf(subPage)
  const [content, setContent] = useState<JSX.Element>(
    contents[subPageIndex >= 0 ? subPageIndex : 0]
  )

  const onClick = (index: number) => {
    setContent(contents[index])
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Canvas
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
        selected={subPageIndex}
      ></ChartButtonGrid>

      {content}
    </>
  )
}
