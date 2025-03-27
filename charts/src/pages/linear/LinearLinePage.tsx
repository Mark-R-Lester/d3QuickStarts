import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { EnumOrientation } from '../../common/enums'
import { LinearLineElement } from '../../components/atoms/chart/linear/elements/LinearLineElement'

export default function LinearLinePage() {
  const elements: JSX.Element[] = [
    <LinearLineElement
      canvasProps={{
        chartName: 'linearLineHorizontal',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearLineElement
      canvasProps={{
        chartName: 'linearLineVertical',
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
        Linear Line
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
