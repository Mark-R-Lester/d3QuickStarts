import { Typography } from '@mui/material'
import { LinearAreaElement } from '../../components/atoms/chart/linear/elements/LinearAreaElement'
import { LinearBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsElement'
import { LinearFloatingBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsFloatingElement'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearLineElement } from '../../components/atoms/chart/linear/elements/LinearLineElement'
import { LinearAxisElement } from '../../components/atoms/chart/linear/elements/LinearAxisElement'
import { LinearPointsElement } from '../../components/atoms/chart/linear/elements/LinearPointsElement'
import { LinearBarsGroupedElement } from '../../components/atoms/chart/linear/elements/LinearBarsGroupedElement'
import { Grouping, Orientation } from '../../common/enums'

export default function LinearElementsPage() {
  const elements: JSX.Element[] = [
    <LinearBarsElement
      chartName="linearHorizontalBars"
      orientation={Orientation.HORIZONTAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearHorizontalBarsFloating"
      orientation={Orientation.HORIZONTAL}
    />,
    <LinearLineElement
      chartName="linearLineHorizontal"
      orientation={Orientation.HORIZONTAL}
    />,
    <LinearPointsElement
      chartName="linearPointsHorizontal"
      orientation={Orientation.HORIZONTAL}
    />,
    <LinearBarsElement
      chartName="linearVerticalBars"
      orientation={Orientation.VERTICAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearVerticalBarsFloating"
      orientation={Orientation.VERTICAL}
    />,

    <LinearLineElement
      chartName="linearLineVertical"
      orientation={Orientation.VERTICAL}
    />,

    <LinearPointsElement
      chartName="linearPointsVertical"
      orientation={Orientation.VERTICAL}
    />,
    <LinearBarsGroupedElement
      chartName="linearBarsGroupedVertical"
      grouping={Grouping.GROUPED}
    />,
    <LinearBarsGroupedElement
      chartName="linearBarsStackedVertical"
      grouping={Grouping.STACKED}
    />,
    <LinearAreaElement chartName="linearArea" />,
    <LinearAxisElement chartName="linearAxis" />,
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
