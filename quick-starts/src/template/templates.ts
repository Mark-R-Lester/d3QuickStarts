import { Canvas, CanvasConfigStrict } from "../canvas/canvas"
import { Selection } from 'd3-selection'



export interface TemplateConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  padding?: number
}

export interface StrictTemplateConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string>  | undefined
  padding: number
}

export interface TemplateArgs {
  data: number[][]
  minimised: boolean
}

export class Template {
  canvasConfig: CanvasConfigStrict
  canvasDisplayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: StrictTemplateConfig


  constructor(canvas: Canvas, customConfig: TemplateConfig) {
    this.canvasConfig = canvas.config
    this.canvasDisplayGroup = canvas.displayGroup

    this.config = {padding: 5}
    this.updateConfig(customConfig)
  }

  updateConfig(customConfig: TemplateConfig) {
    if(customConfig)
      Object.keys(customConfig).forEach(key => (this.config[key] = customConfig[key]))
  }

  draw(args: TemplateArgs) {
    const { min, max, displayAreaWidth, displayAreaHeight } = this.canvasConfig
    const meta: never[] = []
    const { data, minimised } = args
    
    const {} = this.config

    const group = this.canvasDisplayGroup.append('g')
    group
      .selectAll('.element')
      .data(data)
      .enter()
      .append('.element')

    return {
      element: group.selectAll('.element'),
      group,
      meta,
      minimise: () => {},
      maximise: () => {}
    }
  }

  functionName(data: number[][]) {
    this.draw({ data, minimised: false })
  }

  functionNameMinimised(data: number[][]) {
    this.draw({ data, minimised: true })
  }
}
