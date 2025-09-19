import { LegendConfig } from './types'
import { QsCalculatedDataUnboundLegend, QsLegendData } from './qsTypes'
import { Canvas } from '../../canvas/types'
import { CircleConfig, Shape } from '../../core/customShapes/types'
import { QsEnumShape } from '../../core/customShapes/qsEnums'
import { StarConfig } from '../../core/customShapes/star/customStar'
import { RectangleConfig } from '../../core/customShapes/rectangle/customRectangle'
import { PolygonConfig } from '../../core/customShapes/polygon/customPolygon'

export const getCalculatedData = (
  canvas: Canvas,
  data: QsLegendData[],
  config: LegendConfig
): QsCalculatedDataUnboundLegend[] => {
  const {
    xCanvasPercentScale,
    yCanvasPercentScaleInverted,
    genralPercentScale,
  } = canvas.scales
  const {
    height,
    width,
    verticalSpacing,
    relativeTextX,
    relativeTextY,
    x,
    y,
    defaultFillColor,
    defaultFillOpacity,
    defaultStrokeColor,
    defaultStrokeOpacity,
    defaultStrokeWidth,
    defaultTextFont,
    defaultTextFontSize,
    defaultTextFontStyle,
    defaultTextFontWeight,
    defaultTextDecorationLine,
    defaultTextFill,
    defaultTextAngle,
    defaultTextAnchor,
    defaultTextStroke,
    defaultTextAlignmentBaseline,
    shape,
  } = config

  const invertIndex = (data: any[], index: number) => data.length - (index + 1)

  const updateShapeConfig = (type: QsEnumShape, config: unknown): unknown => {
    const updateStarConfig = (config: StarConfig): StarConfig =>
      ({
        ...config,
        outerRadius: genralPercentScale(config.outerRadius),
        innerRadius: config.innerRadius
          ? genralPercentScale(config.innerRadius)
          : config.innerRadius,
      }) as StarConfig

    const updatePolygonConfig = (config: PolygonConfig): PolygonConfig => ({
      ...config,
      radius: genralPercentScale(config.radius),
    })
    const updateCircleConfig = (config: CircleConfig): CircleConfig => ({
      ...config,
      radius: genralPercentScale(config.radius),
    })
    const updateRectangleConfig = (
      config: RectangleConfig
    ): RectangleConfig => ({
      ...config,
      width: genralPercentScale(config.width),
      height: genralPercentScale(config.height),
      y: config.y - genralPercentScale(config.height) / 2,
    })

    const updateMap: {
      [Key in QsEnumShape]: (config: any) => any
    } = {
      [QsEnumShape.STAR]: updateStarConfig,
      [QsEnumShape.POLYGON]: updatePolygonConfig,
      [QsEnumShape.CIRCLE]: updateCircleConfig,
      [QsEnumShape.RECTANGLE]: updateRectangleConfig,
    }

    const updater = updateMap[type]
    if (!updater) {
      throw new Error(`Unknown shape type: ${type}`)
    }

    return updater(config)
  }

  const calculatedData: QsCalculatedDataUnboundLegend[] = data.map((d, i) => {
    return {
      width: genralPercentScale(width),
      height: genralPercentScale(height),
      textX: xCanvasPercentScale(x) + genralPercentScale(relativeTextX),
      textY:
        yCanvasPercentScaleInverted(
          y + verticalSpacing * invertIndex(data, i)
        ) +
        genralPercentScale(height) / 2 -
        genralPercentScale(relativeTextY),
      value: d.value,
      textFont: d.textFont ?? defaultTextFont,
      textFontSize: genralPercentScale(d.textFontSize ?? defaultTextFontSize),
      textFontStyle: d.textFontStyle ?? defaultTextFontStyle,
      textFontWeight: d.textFontWeight ?? defaultTextFontWeight,
      textDecorationLine: d.textDecorationLine ?? defaultTextDecorationLine,
      textFill: d.textFill ?? defaultTextFill,
      textAngle: d.textAngle ?? defaultTextAngle,
      textAnchor: d.textAnchor ?? defaultTextAnchor,
      textStroke: d.textStroke ?? defaultTextStroke,
      textAlignmentBaseline:
        d.textAlignmentBaseline ?? defaultTextAlignmentBaseline,

      fillColor: d.fillColor ?? defaultFillColor,
      fillOpacity: d.fillOpacity ?? defaultFillOpacity,

      strokeColor: d.strokeColor ?? defaultStrokeColor,
      strokeWidth: genralPercentScale(d.strokeWidth ?? defaultStrokeWidth),
      strokeOpacity: d.strokeOpacity ?? defaultStrokeOpacity,

      shape: {
        type: shape.type,

        config: updateShapeConfig(shape.type, {
          ...shape.config,
          x: xCanvasPercentScale(x),
          y: yCanvasPercentScaleInverted(
            y + verticalSpacing * invertIndex(data, i)
          ),
        }),
      } as Shape,
    }
  })
  return calculatedData
}
