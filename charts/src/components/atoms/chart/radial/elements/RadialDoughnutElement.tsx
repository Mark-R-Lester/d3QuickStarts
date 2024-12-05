import { FunctionComponent, useEffect } from 'react'
import {
  Canvas,
  createCanvas,
  radialGenerator,
  QsRadialArgs,
  RadialConfig,
} from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const RadialDoughnutElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data: QsRadialArgs[] = [
      { value: 1, color: { domainName: 'European' } },
      { value: 1, color: { domainName: 'European' } },
      { value: 1, color: { domainName: 'Citrus' } },
      { value: 1, color: { domainName: 'Citrus' } },
      { value: 1, color: { domainName: 'Citrus' } },
      { value: 1, color: { domainName: 'Citrus' } },
      { value: 1, color: { domainName: 'American' } },
      { value: 1, color: { domainName: 'Tropical' } },
      { value: 1, color: { domainName: 'Berry' } },
      { value: 1, color: { domainName: 'Berry' } },
      { value: 1, color: { domainName: 'Citrus' } },
      { value: 1, color: { domainName: 'Citrus' } },
      { value: 1, color: { domainName: 'Eastern' } },
      { value: 1, color: { domainName: 'Eastern' } },
      { value: 1, color: { domainName: 'Vine' } },
      { value: 1, color: { domainName: 'European' } },
      { value: 1, color: { domainName: 'European' } },
      { value: 1, color: { domainName: 'American' } },
      { value: 1, color: { domainName: 'European' } },
    ]

    const config: RadialConfig = {
      outerRadius: 90,
      innerRadius: 50,
      padAngle: 0.03,
      colorDomain: [
        'European',
        'Tropical',
        'Eastern',
        'Vine',
        'Citrus',
        'American',
        'Berry',
      ],
      colorRange: [
        'salmon',
        'darksalmon',
        'purple',
        'brown',
        'hotpink',
        'maroon',
        'magenta',
      ],
    }

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })

    radialGenerator.doughnut(canvas, data, config)
  }

  useEffect(() => {
    createChart()
  }, [])

  return (
    <>
      <div id={targetId}></div>
    </>
  )
}
