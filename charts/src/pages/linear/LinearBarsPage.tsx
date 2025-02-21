import { Box, Grid2 as Grid, Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { EnumOrientation } from '../../common/enums'
import { LinearBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsElement'
import { LinearFloatingBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsFloatingElement'
import { useState } from 'react'

export default function LinearBarsPage() {
  const menuElements: JSX.Element[] = [
    <LinearBarsElement
      chartName="linearHorizontalBarsMenu"
      chartWidth={150}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearHorizontalBarsFloatingMenu"
      chartWidth={150}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearBarsElement
      chartName="linearVerticalBarsMenu"
      chartWidth={150}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearVerticalBarsFloatingMenu"
      chartWidth={150}
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  const elements: JSX.Element[] = [
    <LinearBarsElement
      chartName="linearHorizontalBars"
      chartWidth={600}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearHorizontalBarsFloating"
      chartWidth={600}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearBarsElement
      chartName="linearVerticalBars"
      chartWidth={600}
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearFloatingBarsElement
      chartName="linearVerticalBarsFloating"
      chartWidth={600}
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  const [chart, setChart] = useState<JSX.Element>(elements[2])

  const onClick = (index: number) => {
    setChart(elements[index])
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Bars
      </Typography>
      <ElementGrid elements={menuElements} onClick={onClick}></ElementGrid>
      <Grid container spacing={2} columnSpacing={2} size={12}>
        <Grid>{chart}</Grid>
      </Grid>
      <Box>{chart}</Box>
    </>
  )
}
