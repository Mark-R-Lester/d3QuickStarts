export interface CanvasConfigStrict {
  [key: string]: string | number | undefined
  chartName: string
  width: number
  height: number
  marginRight: number
  marginLeft: number
  marginTop: number
  marginBottom: number
  highestViewableValue: number
  lowestViewableValue: number
  borderColour: string
  displayAreaHeight: number
  displayAreaWidth: number
}
