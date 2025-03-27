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
    <RadialTextTransition
      canvasProps={{
        chartName: 'radialTextFollowTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={data1}
      orientation={EnumRadialTextOrientation.FOLLOW}
    />,
    <RadialTextTransition
      canvasProps={{
        chartName: 'radialTextSkokeTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={data2}
      orientation={EnumRadialTextOrientation.SPOKE}
    />,
    <RadialTextTransition
      canvasProps={{
        chartName: 'radialTextHorizontalTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={data3}
      orientation={EnumRadialTextOrientation.HORIZONTAL}
    />,
    <RadialTextTransition
      canvasProps={{
        chartName: 'radialTextRotatedTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={data4}
      orientation={EnumRadialTextOrientation.ROTATED}
    />,
    <RadialTransition
      canvasProps={{
        chartName: 'radialLinearColorTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
      data={radialData}
      config={{
        innerRadius: 80,
        padAngle: 0.03,
        fillColorScaleData: colorScaleSequential,
      }}
    />,
    <RadialTransition
      canvasProps={{
        chartName: 'radialSerialColoeTransition',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      }}
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
