import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialElement } from '../../components/atoms/chart/radial/elements/RadialElement'
import { RadialSpokesElement } from '../../components/atoms/chart/radial/elements/RadailSpokesElement'
import { RadialAreaElement } from '../../components/atoms/chart/radial/elements/RadialAreaElement'
import { RadialAxisElement } from '../../components/atoms/chart/radial/elements/RadialAxisElement'
import { RadialLineElement } from '../../components/atoms/chart/radial/elements/RadialLineElement'
import { RadialPointsElement } from '../../components/atoms/chart/radial/elements/RadialPointsElement'
import { RadialTextElement } from '../../components/atoms/chart/radial/elements/RadialTextElement'

export default function LinearChartsPage() {
  const elements: JSX.Element[] = [
    <RadialElement targetId="radial" />,
    <RadialAreaElement targetId="radialArea" />,
    <RadialAxisElement targetId="radialAxis" />,
    <RadialLineElement targetId="radialLine" />,
    <RadialPointsElement targetId="radialPoints" />,
    <RadialTextElement targetId="radialText" />,
    <RadialSpokesElement targetId="radialSpokes" />,
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
