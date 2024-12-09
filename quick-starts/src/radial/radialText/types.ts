export interface QsValuedText {
  value: number
  text?: string
}

export interface RadialTextConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  fontSize: number
  x: number
  y: number
}
