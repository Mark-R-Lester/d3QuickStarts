import { Typography } from '@mui/material'
import { EnumOrientation } from '../../common/enums'
import { LinearBarsTransition } from './LinearBarsTransition'
import { LinearLine } from './LinearLine'

export default function LinearBarsPage() {
  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Home
      </Typography>
      <LinearBarsTransition
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
      <LinearLine
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
