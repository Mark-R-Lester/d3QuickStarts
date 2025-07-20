import { Typography } from '@mui/material'
import { EnumOrientation } from '../../common/enums'
import { OrthogonalBarsTransition } from './OrthogonalBarsTransition'
import { OrthogonalLine } from './OrthogonalLine'

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
    </>
  )
}
