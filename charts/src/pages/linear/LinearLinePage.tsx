import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { EnumOrientation } from '../../common/enums'
import { LinearLineElement } from '../../components/atoms/chart/linear/elements/LinearLineElement'

export default function LinearLinePage() {
  const elements: JSX.Element[] = [
    <LinearLineElement
      chartName="linearLineHorizontal"
      chartWidth={150}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearLineElement
      chartName="linearLineVertical"
      chartWidth={150}
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
