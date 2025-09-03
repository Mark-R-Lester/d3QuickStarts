/**
 * Recalculates the index based on the NumberOfSpokes
 * To purpose of this is to have the first spoke at at 0 degrees and at the top (12 o'clock)
 * all other spoke angles will be calculated clockwise from zero degrees
 * [0,1,2,3,4,5] will effectively become [3,2,1,0,5,4]
 */
export const alignIndexClockwise = (
  index: number,
  numberOfSpokes: number
): number => {
  const reverseIndex = numberOfSpokes - index

  let res: number
  res = reverseIndex - Math.ceil(numberOfSpokes / 2)
  if (res < 0) res = reverseIndex + Math.floor(numberOfSpokes / 2)
  return res
}
