export interface AdjacentAngleInput {
  adjacent: number
  radians: number
}
export interface OppositeAngleInput {
  opposite: number
  radians: number
}
export interface HypotenuseAngleInput {
  hypotenuse: number
  radians: number
}

export const hypotenuseFromAdjacent = ({
  adjacent,
  radians,
}: AdjacentAngleInput): number => adjacent / Math.cos(radians)

export const hypotenuseFromOpposite = ({
  opposite,
  radians,
}: OppositeAngleInput): number => opposite / Math.sin(radians)

export const adjacentFromHypotenuse = ({
  hypotenuse,
  radians,
}: HypotenuseAngleInput): number => hypotenuse * Math.cos(radians)

export const adjacentFromOpposite = ({
  opposite,
  radians,
}: OppositeAngleInput): number => opposite / Math.tan(radians)

export const oppositeFromHypotenuse = ({
  hypotenuse,
  radians,
}: HypotenuseAngleInput): number => hypotenuse * Math.sin(radians)

export const oppositeFromAdjacent = ({
  adjacent,
  radians,
}: AdjacentAngleInput): number => adjacent * Math.tan(radians)
