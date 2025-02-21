import { Typography } from '@mui/material'

import { ElementGrid } from '../../components/atoms/ElementGrid'
import { EnumOrientation } from '../../common/enums'
import { LinearTextElement } from '../../components/atoms/chart/linear/elements/LinearTextElement'

export default function LinearTextPage() {
  const elements: JSX.Element[] = [
    <LinearTextElement
      chartName="linearTextHorizontal"
      chartWidth={150}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearTextElement
      chartName="linearTextVertical"
      chartWidth={150}
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Text
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
