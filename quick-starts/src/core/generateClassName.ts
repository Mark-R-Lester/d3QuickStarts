import { v4 as uuidv4 } from 'uuid'

export const generateClassName = (
  className: string
): { dotClassName: string; className: string } => {
  const id = uuidv4()

  return {
    dotClassName: `.${className}_${id}`,
    className: `${className}_${id}`,
  }
}
