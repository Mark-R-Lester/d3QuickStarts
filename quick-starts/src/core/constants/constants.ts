import {
  curveBasis,
  curveBumpX,
  curveBumpY,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
} from 'd3'
import { QsEnumCurve } from '../enums/qsEnums'

export const constantsCurves = {
  [QsEnumCurve.BASIS]: curveBasis,
  [QsEnumCurve.BUMP_X]: curveBumpX,
  [QsEnumCurve.BUMP_Y]: curveBumpY,
  [QsEnumCurve.orthogonal]: curveLinear,
  [QsEnumCurve.MONOTONE_X]: curveMonotoneX,
  [QsEnumCurve.MONOTONE_Y]: curveMonotoneY,
  [QsEnumCurve.NATURAL]: curveNatural,
  [QsEnumCurve.STEP]: curveStep,
  [QsEnumCurve.STEP_AFTER]: curveStepAfter,
  [QsEnumCurve.STEP_BEFORE]: curveStepBefore,
}
