
import { range, scaleLinear, curveLinear, CurveFactory } from 'd3'
import { Canvas } from '../canvas/canvas'
import { v4 as uuidv4 } from 'uuid'

interface AreaConfig {
  [key: string]:  CurveFactory | string | undefined
  curve?: CurveFactory,
  color?: string
}

interface AreaConfigStrict {
  [key: string]:  CurveFactory | string | undefined
  curve: CurveFactory,
  color: string
}

function create (data1: number[][], data0: number[][], minimised: boolean, canvas: Canvas, newConfig: AreaConfigStrict) {

  const configDefault: AreaConfigStrict = {
    curve: curveLinear,
    color: 'red'
  }
  
  function updateConfig() {
    Object.keys(newConfig).forEach(key => (configDefault[key] = newConfig[key]))
    return newConfig as AreaConfigStrict
  }
  
  const configStrict = updateConfig()

  function draw(args: { data0: number[][], data1: number[][], minimised: boolean }) {
    const { min, max, displayAreaHeight, displayAreaWidth} = canvas.config
    const { curve, color } = configStrict
    const { data1, data0, minimised } = args
    const meta: any[] = []

    const populateMeta = (data1: number[][], data0: number[][]) => {
      const xVals = range(0, displayAreaWidth, displayAreaWidth / data1.length)
      meta.push({
        class: 'area',
        id: `area-${uuidv4()}`,
        areaData: data1.map((d, i) => [xVals[i], d[0], data0 ? data0[i][0] : 0]),
        areaDataMin: data1.map((d, i) => [xVals[i], 0, 0])
      })
    }
    populateMeta(data1, data0)

    const xScale = scaleLinear()
      .domain([0, d3.max(meta[0].areaData.map(d => d[0]))])
      .range([0, displayAreaWidth])
    const yScale = scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(meta[0].areaData.map(d => d[1]))])
      .range([displayAreaHeight, 0])

    const area = () => area()
      .x(d => xScale(d[0]))
      .y1(d => yScale(d[1]))
      .y0(d => yScale(d[2]))
      .curve(curve)

    const group = canvas.displayGroup.append('g')
    group
      .append('path')
      .attr('class', meta[0].class)
      .attr('id', meta[0].id)
      .attr('d', area()(minimised ? meta[0].areaDataMin : meta[0].areaData))
      .attr('fill', color)
    return {
      area: group.select(`.${meta[0].class}`),
      group,
      meta,
      minimise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .transition()
          .duration(3000)
          .attr('d', area()(meta[0].areaDataMin))
      },
      maximise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .transition()
          .duration(3000)
          .attr('d', area()(meta[0].areaData))
      }
    }
  }
  draw({ data0, data1, minimised })

}

export function createHorizontalArea(data1: number[][], data0: number[][], canvas: Canvas, config: AreaConfigStrict) {
  return create(data0, data1, false, canvas, config )
}

export function createhorizontalAreaMinimised(data1: number[][], data0: number[][], canvas: Canvas, config: AreaConfigStrict) {
  return create(data0, data1, true, canvas, config )
}


