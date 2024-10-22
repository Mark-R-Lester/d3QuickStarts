import { Box, Typography } from '@mui/material'
import { Axiss, Canvas, createCanvas } from 'd3qs/d3QuickStart'
import { useCallback, useEffect } from 'react'

export default function BarsPage() {
  const createChart = useCallback(() => {
    const data1: number[] = [0, 20, 20, 30, 20, 35, 0, 20, 15, 30, 10, 50]
    const data2: string[] = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
    ]
    const canvas: Canvas | undefined = createCanvas('#chart', { width: 800 })
    if (canvas) {
      const axis1: Axiss = new Axiss(canvas)
      axis1.xAxisBottomBanded(data2)
      axis1.yAxisLeftBanded(data1)
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
        <div id="chart"></div>
      </Box>
    </>
  )
}
