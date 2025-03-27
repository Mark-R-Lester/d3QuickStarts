import { Typography } from '@mui/material'

import { ElementGrid } from '../../components/atoms/ElementGrid'
import { EnumOrientation } from '../../common/enums'
import { LinearPointsElement } from '../../components/atoms/chart/linear/elements/LinearPointsElement'

export default function LinearPointsPage() {
  const elements: JSX.Element[] = [
    <LinearPointsElement
      canvasProps={{
        chartName: 'linearPointsHorizontal',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearPointsElement
      canvasProps={{
        chartName: 'linearPointsVertical',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Points
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
