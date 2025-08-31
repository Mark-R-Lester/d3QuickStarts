import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { PlottedTextChart } from './PlottedTextChart'

import { basic, configAndData, editorContent } from './Content'
import {
  ContentBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { useSearchParams } from 'react-router-dom'
import {
  CanvasPageLinkBasic,
  CanvasPageLinkPlotted,
  ConfigPageLink,
  EnumPageLink,
  SubPage,
  SubPageTarget,
} from '../../../components/atoms/links'
import {
  ContentColumn,
  JustifyOptions,
} from '../../../components/atoms/content/ContentColumn'

export default function PlottedTextPage() {
  const [searchParams] = useSearchParams()
  const subPage = searchParams.get('subPage') || SubPage.BASIC

  const menuElements: JSX.Element[] = [
    <PlottedTextChart
      canvasConfig={{
        chartName: 'plottedTextChart',
        width: 130,
        highestViewableValueX: 35,
        highestViewableValueY: 35,
      }}
    />,
    <ConfigAndData />,
    <TryItYourSelf />,
  ]

  const contents: JSX.Element[] = [basic, configAndData, editorContent]
  const subPageIndex = [
    SubPageTarget.BASIC,
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
        Plotted Text
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
        selected={subPageIndex}
      ></ChartButtonGrid>

      <Box>
        <ContentColumn
          elements={[
            <ContentTitle key="title" variant="h3"></ContentTitle>,
            <ContentBox>
              <ContentColumn
                justify={JustifyOptions.LEFT}
                gap={0}
                elements={[
                  <Typography key="title" variant="h4">
                    Related content
                  </Typography>,
                  <CanvasPageLinkBasic />,
                  <CanvasPageLinkPlotted />,
                  <ConfigPageLink />,
                  <EnumPageLink />,
                ]}
              />
            </ContentBox>,
          ]}
        />
        {content}
      </Box>
    </>
  )
}
