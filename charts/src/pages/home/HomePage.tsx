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
        canvasConfig={{
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
        canvasConfig={{
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
        canvasConfig={{
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
        canvasConfig={{
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
        canvasConfig={{
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
        canvasConfig={{
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
        canvasConfig={{
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
        canvasConfig={{
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
