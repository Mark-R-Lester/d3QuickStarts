import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialAreaTransition } from '../../components/atoms/chart/radial/transitions/RadialAreaTransition'
import { RadialLineTransition } from '../../components/atoms/chart/radial/transitions/RadialLineTransition'
import { RadialPointTransition } from '../../components/atoms/chart/radial/transitions/RadialPointsTransition'
import { RadialTextTransition } from '../../components/atoms/chart/radial/transitions/RadialTextTransition'
import {
  QsColorScaleData,
  QsRadialData,
  QsRadialPointData,
  QsValuedText,
  QsEnumColorScale,
} from 'd3qs/d3QuickStart'
import { EnumRadialTextOrientation } from '../../common/enums'
import { RadialTransition } from '../../components/atoms/chart/radial/transitions/RadialTransition'

export default function RadialTransitionsPage() {
  const data1: QsValuedText[] = [{ value: 25 }, { value: 10 }, { value: 15 }]
  const data2: QsValuedText[] = [{ value: 25 }, { value: 10 }, { value: 15 }]
  const data3: QsValuedText[] = [{ value: 25 }, { value: 10 }, { value: 15 }]
  const data4: QsValuedText[] = [{ value: 25 }, { value: 10 }, { value: 15 }]

  const radialData: QsRadialData[] = [
    { value: 25 },
    { value: 10 },
    { value: 15 },
    { value: 30 },
    { value: 25 },
    { value: 10 },
    { value: 15 },
    { value: 30 },
  ]

  const radialPointsColouredData: QsRadialPointData[] = [
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
    { value: 1, fillColor: 'red' },
    { value: 2, fillColor: 'blue' },
  ]

  const radialPointsData: QsRadialPointData[] = [
    { value: 1, fillColor: 'red' },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
  ]

  const colorScaleOrdinal: QsColorScaleData = {
    domain: [1, 100],
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.ORDINAL,
  }

  const colorScaleSequential: QsColorScaleData = {
    domain: [1, 100],
    range: ['lightblue', 'darkblue'],
    type: QsEnumColorScale.SEQUENTIAL,
  }

  const colorScaleSequentialPoints: QsColorScaleData = {
    domain: [1, 2],
    range: ['green', 'orange'],
    type: QsEnumColorScale.SEQUENTIAL,
  }

  const elements: JSX.Element[] = [
    <RadialAreaTransition chartName="radialAreaTransition" chartWidth={150} />,
    <RadialLineTransition chartName="radialLineTransition" chartWidth={150} />,
    <RadialPointTransition
      chartName="radialPointsTransition"
      chartWidth={150}
      data={radialPointsColouredData}
    />,
    <RadialPointTransition
      chartName="radialPointsOridinalTransition"
      chartWidth={150}
      data={radialPointsData}
      config={{
        fillColorScaleData: colorScaleOrdinal,
      }}
    />,
    <RadialPointTransition
      chartName="radialPointsSerialTransition"
      chartWidth={150}
      data={radialPointsData}
      config={{
        fillColorScaleData: colorScaleSequentialPoints,
      }}
    />,

    <RadialTextTransition
      chartName="radialTextFollowTransition"
      chartWidth={150}
      data={data1}
      orientation={EnumRadialTextOrientation.FOLLOW}
    />,
    <RadialTextTransition
      chartName="radialTextSkokeTransition"
      chartWidth={150}
      data={data2}
      orientation={EnumRadialTextOrientation.SPOKE}
    />,
    <RadialTextTransition
      chartName="radialTextHorizontalTransition"
      chartWidth={150}
      data={data3}
      orientation={EnumRadialTextOrientation.HORIZONTAL}
    />,
    <RadialTextTransition
      chartName="radialTextRotatedTransition"
      chartWidth={150}
      data={data4}
      orientation={EnumRadialTextOrientation.ROTATED}
    />,
    <RadialTransition
      chartName="radialLinearColorTransition"
      chartWidth={150}
      data={radialData}
      config={{
        innerRadius: 80,
        padAngle: 0.03,
        fillColorScaleData: colorScaleSequential,
      }}
    />,
    <RadialTransition
      chartName="radialSerialColoeTransition"
      chartWidth={150}
      data={radialData}
      config={{
        innerRadius: 50,
        fillColorScaleData: colorScaleOrdinal,
      }}
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
