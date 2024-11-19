import { useCallback, useEffect } from 'react'
import { Canvas, createCanvas, axisGenerator } from 'd3qs/d3QuickStart'
import { Box, Typography } from '@mui/material'

export default function AxisPage() {
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
    const canvas: Canvas | undefined = createCanvas('#chart', { width: 1000 })

    if (canvas) {
      axisGenerator.xAxisBottomBanded(canvas, data2)
      axisGenerator.yAxisLeftBanded(canvas, data1)
    }
  }, [])

  useEffect(() => {
    createChart()
  }, [])

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Axis
      </Typography>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'white' }}>
        <div id="chart"></div>
      </Box>
    </>
  )
}
