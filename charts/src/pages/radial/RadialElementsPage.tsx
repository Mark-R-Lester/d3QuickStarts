import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialPieElement } from '../../components/atoms/chart/radial/elements/RadialPieElement'
import { RadialSpokesElement } from '../../components/atoms/chart/radial/elements/RadailSpokesElement'
import { RadialAreaElement } from '../../components/atoms/chart/radial/elements/RadialAreaElement'
import { RadialAxisElement } from '../../components/atoms/chart/radial/elements/RadialAxisElement'
import { RadialLineElement } from '../../components/atoms/chart/radial/elements/RadialLineElement'
import { RadialPointsElement } from '../../components/atoms/chart/radial/elements/RadialPointsElement'
import { RadialTextElement } from '../../components/atoms/chart/radial/elements/RadialTextElement'
import { RadialDoughnutElement } from '../../components/atoms/chart/radial/elements/RadialDoughnutElement'

export default function RadialElementsPage() {
  const elements: JSX.Element[] = [
    <RadialDoughnutElement chartName="radialDoughnut" />,
    <RadialPieElement chartName="radialPie" />,
    <RadialAreaElement chartName="radialArea" />,
    <RadialAxisElement chartName="radialAxis" />,
    <RadialLineElement chartName="radialLine" />,
    <RadialPointsElement chartName="radialPoints" />,
    <RadialTextElement chartName="radialText" />,
    <RadialSpokesElement chartName="radialSpokes" />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Elements
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
