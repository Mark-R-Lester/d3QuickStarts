export interface AdjacentAngleInput {
  adjacent: number
  angle: number
}
export interface OppositeAngleInput {
  opposite: number
  angle: number
}
export interface HypotenuseAngleInput {
  hypotenuse: number
  angle: number
}

export const hypotenuseFromAdjacent = ({
  adjacent,
  angle,
}: AdjacentAngleInput): number => adjacent / Math.cos(angle)

export const hypotenuseFromOpposite = ({
  opposite,
  angle,
}: OppositeAngleInput): number => opposite / Math.sin(angle)

export const adjacentFromHypotenuse = ({
  hypotenuse,
  angle,
}: HypotenuseAngleInput): number => hypotenuse * Math.cos(angle)

export const adjacentFromOpposite = ({
  opposite,
  angle,
}: OppositeAngleInput): number => opposite / Math.tan(angle)

export const oppositeFromHypotenuse = ({
  hypotenuse,
  angle,
}: HypotenuseAngleInput): number => hypotenuse * Math.sin(angle)

export const oppositeFromAdjacent = ({
  adjacent,
  angle,
}: AdjacentAngleInput): number => adjacent * Math.tan(angle)
