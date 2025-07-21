import { CanvasConfig } from './types'

export const scaleMarginsAndDisplayArea = (
  config: CanvasConfig
): CanvasConfig => {
  const marginRight = (config.width * config.marginRight) / 100
  const marginLeft = (config.width * config.marginLeft) / 100
  const marginTop = (config.height * config.marginTop) / 100
  const marginBottom = (config.height * config.marginBottom) / 100

  return {
    ...config,
    marginRight,
    marginLeft,
    marginTop,
    marginBottom,
    displayAreaHeight: config.height - (marginBottom + marginTop),
    displayAreaWidth: config.width - (marginLeft + marginRight),
  }
}
