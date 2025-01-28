import { Typography } from '@mui/material'
import { LinearAreaElement } from '../../components/atoms/chart/linear/elements/LinearAreaElement'
import { LinearBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsElement'
import { LinearFloatingBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsFloatingElement'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearLineElement } from '../../components/atoms/chart/linear/elements/LinearLineElement'
import { LinearAxisElement } from '../../components/atoms/chart/linear/elements/LinearAxisElement'
import { LinearPointsElement } from '../../components/atoms/chart/linear/elements/LinearPointsElement'
import { LinearBarsGroupedElement } from '../../components/atoms/chart/linear/elements/LinearBarsGroupedElement'
import { EnumOrientation } from '../../common/enums'
import { LinearBarStacksElement } from '../../components/atoms/chart/linear/elements/LinearBarStacksElement'
import { LinearTextElement } from '../../components/atoms/chart/linear/elements/LinearTextElement'

export default function LinearElementsPage() {
  const elements: JSX.Element[] = [
    <LinearAxisElement chartName="linearAxis" />,
    <LinearBarsElement
      chartName="linearHorizontalBars"
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearHorizontalBarsFloating"
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearLineElement
      chartName="linearLineHorizontal"
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearPointsElement
      chartName="linearPointsHorizontal"
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearTextElement
      chartName="linearTextHorizontal"
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

    <LinearLineElement
      chartName="linearLineVertical"
      orientation={EnumOrientation.VERTICAL}
    />,

    <LinearPointsElement
      chartName="linearPointsVertical"
      orientation={EnumOrientation.VERTICAL}
    />,

    <LinearTextElement
      chartName="linearTextVertical"
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearBarsGroupedElement chartName="linearBarsGroupedVertical" />,
    <LinearBarStacksElement chartName="linearBarsStackedVertical" />,
    <LinearAreaElement chartName="linearArea" />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Elements
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
