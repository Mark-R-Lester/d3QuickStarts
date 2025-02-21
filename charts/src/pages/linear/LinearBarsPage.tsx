import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { EnumOrientation } from '../../common/enums'
import { LinearBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsElement'
import { LinearFloatingBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsFloatingElement'

export default function LinearBarsPage() {
  const elements: JSX.Element[] = [
    <LinearBarsElement
      chartName="linearHorizontalBars"
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearHorizontalBarsFloating"
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearBarsElement
      chartName="linearVerticalBars"
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearVerticalBarsFloating"
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Bars
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
