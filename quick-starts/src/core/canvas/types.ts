export interface CanvasConfig {
  [key: string]: string | number | undefined
  ry: number
  rx: number
  chartName: string
  width: number
  height: number
  marginRight: number
  marginLeft: number
  marginTop: number
  marginBottom: number
  highestViewableValue: number
  lowestViewableValue: number
  highestViewableValuePlottedX?: number
  lowestViewableValuePlottedX?: number
  borderColor: string
  borderWidth: number
  fillColor: string
  displayAreaHeight: number
  displayAreaWidth: number
}

export interface ElementWithData {
  element: any
  data: any
}
