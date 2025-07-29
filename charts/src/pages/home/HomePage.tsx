import { Typography } from '@mui/material'
import { EnumOrientation } from '../../common/enums'
import { OrthogonalBarsTransition } from './OrthogonalBarsTransition'
import { OrthogonalLine } from './OrthogonalLineTransition'
import { OrthogonalAreaChart } from './OrthogonalAreaChart'
import { OrthogonalAreaOpacityChart } from './OrthogonalAreaOpacityChart'
import { OrthogonalAreaStackedChart } from './OrthogonalAreaStackedChart'
import { OrthogonalBarChart } from './OrthogonalBarChart'
import { OrthogonalBarFruitsChart } from './OrthogonalBarFruitsChart'
import { OrthogonalCandleChart } from './OrthogonalCandleChart'

export default function orthogonalBarsPage() {
  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Home
      </Typography>
      <OrthogonalBarsTransition
        canvasProps={{
          chartName: 'simpleBarChartHorizontal',
          height: 500,
          width: 1000,
          lowestViewableValue: 0,
          highestViewableValue: 50,
          fillColor: 'lightgrey',
          ry: 30,
          rx: 30,
        }}
        orientation={EnumOrientation.HORIZONTAL}
      />
      <OrthogonalLine
        canvasProps={{
          chartName: 'simpleChart',
          height: 500,
          width: 1000,
          lowestViewableValue: 0,
          highestViewableValue: 50,
          fillColor: 'lightGrey',
          ry: 30,
          rx: 30,
        }}
        orientation={EnumOrientation.HORIZONTAL}
      />
      <OrthogonalCandleChart
        canvasProps={{
          chartName: 'orthogonalCandleChart',
          height: 500,
          width: 1000,
          lowestViewableValue: 0,
          highestViewableValue: 40,
          fillColor: 'black',
          ry: 30,
          rx: 30,
        }}
      />
      <OrthogonalBarChart
        canvasProps={{
          chartName: 'orthogonalBarBasicChart',
          height: 500,
          width: 1000,
          lowestViewableValue: 0,
          highestViewableValue: 40,
          fillColor: 'lightGrey',
          ry: 30,
          rx: 30,
        }}
      />
      <OrthogonalBarFruitsChart
        canvasProps={{
          chartName: 'orthogonalBarFruitsChart',
          height: 500,
          width: 1000,
          lowestViewableValue: 0,
          highestViewableValue: 40,
          fillColor: 'lightGrey',
          ry: 30,
          rx: 30,
        }}
      />
      <OrthogonalAreaChart
        canvasProps={{
          chartName: 'orthogonalAreaChart',
          height: 500,
          width: 1000,
          lowestViewableValue: 0,
          highestViewableValue: 200,
          fillColor: 'lightGrey',
          ry: 30,
          rx: 30,
        }}
      />
      <OrthogonalAreaOpacityChart
        canvasProps={{
          chartName: 'orthogonalAreaOpacityChart',
          height: 500,
          width: 1000,
          lowestViewableValue: 0,
          highestViewableValue: 200,
          fillColor: 'black',
          ry: 30,
          rx: 30,
        }}
      />

      <OrthogonalAreaStackedChart
        canvasProps={{
          chartName: 'orthogonalAreaStackedChart',
          height: 500,
          width: 1000,
          lowestViewableValue: 0,
          highestViewableValue: 200,
          fillColor: 'lightGrey',
          ry: 30,
          rx: 30,
        }}
      />
    </>
  )
}
