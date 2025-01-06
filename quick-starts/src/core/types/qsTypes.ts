import { ColorCommonInstance } from 'd3'
import { QsEnumColorScale } from '../enums/qsEnums'

export interface QsCoordinate {
  [key: string]: number | string | undefined
  x: number
  y: number
}

export interface QsColorScaleData {
  [key: string]: number[] | (string | ColorCommonInstance)[] | string
  domain: number[]
  range: (string | ColorCommonInstance)[]
  type: QsEnumColorScale
}

export interface QsTransitionArgs {
  [key: string]: number | undefined
  delayInMiliSeconds?: number
  durationInMiliSeconds?: number
}

type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = [],
> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>

type Add<Num1 extends number, Num2 extends number> = [
  ...BuildArray<Num1>,
  ...BuildArray<Num2>,
]['length']

type Subtract<Num1 extends number, Num2 extends number> =
  BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
    ? Rest['length']
    : never

type RangeOf<
  start extends number,
  end extends number,
  R extends unknown[] = [start],
> =
  R['length'] extends Subtract<end, start>
    ? [...R, end][number]
    : RangeOf<start, end, [...R, Add<start, R['length']>]>

export type QsPercentage = RangeOf<0, 100>
