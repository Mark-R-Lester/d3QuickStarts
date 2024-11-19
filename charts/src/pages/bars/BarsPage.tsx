import { Box, Typography } from '@mui/material'
import {
  Canvas,
  createCanvas,
  barGenerator,
  barFloatingGenerator,
} from 'd3qs/d3QuickStart'
import { useCallback, useEffect } from 'react'

export default function BarsPage() {
  const createChart = useCallback(() => {
    const data1 = [25, 10, 35, 25, 35, 5, 25, 15]
    const canvasV: Canvas | undefined = createCanvas('#verticalBars', {
      width: 600,
    })
    if (canvasV) {
      barGenerator.vertical(canvasV, data1)
    }

    const canvasH: Canvas | undefined = createCanvas('#horizontalBars', {
      width: 600,
    })
    if (canvasH) {
      barGenerator.horizontal(canvasH, data1)
    }

    const data2 = [
      [10, 30],
      [20, 40],
      [30, 50],
      [40, 60],
      [50, 70],
    ]
    const canvasFV: Canvas | undefined = createCanvas(
      '#horizontalFloatingBars',
      {
        width: 600,
      }
    )
    if (canvasFV) {
      barFloatingGenerator.horizontal(canvasFV, data2)
    }
  }, [])

  useEffect(() => {
    createChart()
  }, [])

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Bars
      </Typography>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'white' }}>
        <div id="verticalBars"></div>
        <div id="horizontalBars"></div>
        <div id="horizontalFloatingBars"></div>
      </Box>
    </>
  )
}
