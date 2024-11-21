import { useCallback, useEffect } from 'react'
import { Canvas, createCanvas, areaGenerator } from 'd3qs/d3QuickStart'
import { Box, Typography } from '@mui/material'

export default function AreaPage() {
  const createChart = useCallback(() => {
    var data1 = [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 132]
    var data2 = [25, 15, 40, 36, 80, 100, 96, 136, 125, 155, 205, 213]

    const canvas: Canvas = createCanvas('chart', {
      width: 1000,
      min: 0,
      max: 250,
    })

    areaGenerator
      .horizontal(canvas, { higherData: data1 }, { color: 'black' })
      .area.attr('fill', 'blue')
      .attr('fill-opacity', '0.5')
    areaGenerator
      .horizontal(canvas, { higherData: data2, lowerData: data1 })
      .area.attr('fill', 'red')
      .attr('fill-opacity', '0.5')
  }, [])

  useEffect(() => {
    createChart()
  }, [])

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Area
      </Typography>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'white' }}>
        <div id="chart"></div>
      </Box>
    </>
  )
}
