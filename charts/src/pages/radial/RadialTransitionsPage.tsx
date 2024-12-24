import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialAreaTransition } from '../../components/atoms/chart/radial/transitions/RadialAreaTransition'
import { RadialLineTransition } from '../../components/atoms/chart/radial/transitions/RadialLineTransition'
import { RadialPointTransition } from '../../components/atoms/chart/radial/transitions/RadialPointsTransition'
import { RadialTextTransition } from '../../components/atoms/chart/radial/transitions/RadialTextTransition'
import { QsValuedText } from 'd3qs/d3QuickStart'
import { EnumRadialTextOrientation } from '../../common/enums'

export default function RadialTransitionsPage() {
  const data: QsValuedText[] = [{ value: 25 }, { value: 10 }, { value: 15 }]

  const elements: JSX.Element[] = [
    <RadialAreaTransition chartName="radialAreaTransition" />,
    <RadialLineTransition chartName="radialLineTransition" />,
    <RadialPointTransition chartName="radialPointsTransition" />,
    <RadialTextTransition
      chartName="radialTextFollowTransition"
      data={data}
      orientation={EnumRadialTextOrientation.FOLLOW}
    />,
    <RadialTextTransition
      chartName="radialTextSkokeTransition"
      data={data}
      orientation={EnumRadialTextOrientation.SPOKE}
    />,
    <RadialTextTransition
      chartName="radialTextHorizontalTransition"
      data={data}
      orientation={EnumRadialTextOrientation.HORIZONTAL}
    />,
    <RadialTextTransition
      chartName="radialTextRotatedTransition"
      data={data}
      orientation={EnumRadialTextOrientation.ROTATED}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Transitions
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
