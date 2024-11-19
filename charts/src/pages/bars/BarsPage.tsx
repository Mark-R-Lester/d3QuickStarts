import { Box, Typography } from '@mui/material'
import { Canvas, createCanvas, barGenerator } from 'd3qs/d3QuickStart'
import { useCallback, useEffect } from 'react'

export default function BarsPage() {
  const createChart = useCallback(() => {
    var data1 = [25, 10, 35, 25, 35, 5, 25, 15]
    const canvasV: Canvas | undefined = createCanvas('#verticalBars', {
      width: 1000,
    })
    if (canvasV) {
      barGenerator.vertical(canvasV, data1)
    }

    const canvasH: Canvas | undefined = createCanvas('#horizontalBars', {
      width: 1000,
    })
    if (canvasH) {
      barGenerator.horizontal(canvasH, data1)
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
      </Box>
    </>
  )
}
