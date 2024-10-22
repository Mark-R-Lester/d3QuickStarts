import { Canvas, CanvasConfigStrict } from '../canvas/canvas'
import { Selection } from 'd3-selection'
import { scaleLinear, CurveFactory, curveLinear, areaRadial} from 'd3'
import { v4 as uuidv4 } from 'uuid'

export interface RadialAreaConfig {
  [key: string]: CurveFactory | number | undefined
  curve?: CurveFactory
  x?: number
  y?: number
}

export interface StrictRadialAreaConfig {
  [key: string]: CurveFactory | number | undefined
  curve: CurveFactory
  x: number
  y: number
}

export interface RadialAreaArgs {
  dataOuter: number[] 
  dataInner: number[]
  minimise: boolean
}

interface RadialAreaData {
  angle: number
  inner: number
  outer: number
}

interface RadialAreaMeta {
  class: string
  id: string
  areaDataMin: RadialAreaData[]
  areaData: RadialAreaData[]
}

export class RadialArea {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: StrictRadialAreaConfig

  updateConfig(customConfig: RadialAreaConfig) {
    if(customConfig)
      Object.keys(customConfig).forEach(key => (this.config[key] = customConfig[key]));
  }

  constructor(canvas: Canvas, config: RadialAreaConfig) {
    this.canvasConfig = canvas.config;
    this.canvasDisplayGroup = canvas.displayGroup;

    this.config = {
      curve: curveLinear,
      x: 50,
      y: 50
    }
    this.updateConfig(config);
  }

  draw(args: RadialAreaArgs) {
    const { dataOuter, dataInner, minimise } = args;
    const { x, y, curve } = this.config;
    const { min, max, displayAreaHeight, displayAreaWidth } = this.canvasConfig;
    let meta: RadialAreaMeta
    const angleScale = scaleLinear()
      .domain([0, dataOuter.length])
      .range([0, 2 * Math.PI]);
    const radialScale = scaleLinear()
      .domain([min, max])
      .range([0, displayAreaHeight / 2]);
    const xAxis = scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaWidth]);
    const yAxis = scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight]);

    const dataOuterCopy: number[] = dataOuter.slice()
    dataOuterCopy.push(dataOuter[0])
    let dataInnerCopy: number[]
    if (dataInner) {
      dataInnerCopy = dataInner.slice()
      dataInnerCopy.push(dataInner[0])
    }
    meta = {
      class: 'radialArea',
      id: `radialArea${uuidv4()}`,
      areaDataMin: dataOuterCopy.map((d, i) => { return { 
        angle: angleScale(i), 
        inner: radialScale(min), 
        outer: radialScale(min)
    }}),
      areaData: dataOuterCopy.map((d, i) => { return {
        angle: angleScale(i),
        inner: radialScale(d),
        outer: radialScale(dataInnerCopy ? dataInnerCopy[i] : min)
    }})
    }

    const radialArea = areaRadial<RadialAreaData>()
      .angle(d => d.angle)
      .outerRadius(d => d.outer)
      .innerRadius(d => d.inner)
      .curve(curve)
      
    const group = this.canvasDisplayGroup.append('g');
    group
      .append('path')
      .attr('class', meta.class)
      .attr('id', meta.id)
      .attr('d', radialArea(minimise ? meta.areaDataMin : meta.areaData))
      .attr('fill', 'red')
      .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`);
    return {
      area: group.selectAll('path'),
      group,
      meta,
      maximise: () => {
        group
          .selectAll(`.${meta.class}`)
          .transition()
          .duration(3000)
          .attr('d', radialArea(meta.areaData));
      },
      minimise: () => {
        group
          .selectAll(`.${meta.class}`)
          .transition()
          .duration(3000)
          .attr('d', radialArea(meta.areaDataMin));
      }
    }
  }

  radialArea(dataOuter: number[], dataInner: number[]) {
    return this.draw({ dataOuter, dataInner, minimise: false });
  }

  radialAreaMinimised(dataOuter: number[], dataInner: number[]) {
    return this.draw({ dataOuter, dataInner, minimise: true });
  }
}
