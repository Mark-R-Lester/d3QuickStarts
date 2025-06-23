export enum Orientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export enum Grouping {
  GROUPED = 'grouped',
  STACKED = 'stacked',
}

export enum ChartEdge {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum RadialTextType {
  FOLLOW = 'follow',
  HORIZONTAL = 'horizontal',
  SPOKE = 'spoke',
  ROTATED = 'rotated',
}

export enum GlobalDefaultColors {
  FILL_COLOR = 'steelblue',
  STROKE_COLOR = 'black',
  AREA_FILL_COLOR = 'steelblue',
  AREA_STROKE_COLOR = 'black',
  BAR_FILL = 'steelblue',
  BAR_STROKE = 'black',
  POINT_FILL = 'steelblue',
  POINT_STROKE = 'black',
  AXIS_COLOR = 'black',
  LINE_COLOR = 'black',
  TEXT_FILL_COLOR = 'black',
  TEXT_STROKE_COLOR = 'none',
}

export enum GlobalDefaultSettings {
  FILL_OPACITY = 1,
  STROKE_OPACITY = 1,
  STROKE_WIDTH = 0,
  LINE_STROKE_WIDTH = 0.3,
  LINE_STROKE_OPACITY = 1,
  FONT_SIZE = 4,
  RADIAL_X = 50,
  RADIAL_Y = 50,
  POINT_RADIUS = 3,
  DECIMAL_POINTS = 1,
  TEXT_ANGLE = 0,
}

export enum Selection {
  BAR_GROUP = 'barGroup',
  BAR_GROUPED = 'barGrouped',
  BAR = 'bar',
  BAR_STACK = 'barStack',
  BAR_STACKED = 'barStacked',
  CIRCLE = 'circle',
  TEXT = 'text',
  ARC = 'arc',
  PATH = 'path',
  RING = 'ring',
  TICK = 'tick',
  LEGEND = 'legend',
}

export enum SelectionClass {
  BAR_GROUP_CLASS = '.barGroup',
  BAR_GROUPED_CLASS = '.barGrouped',
  BAR_CLASS = '.bar',
  BAR_STACK_CLASS = '.barStack',
  BAR_STACKED_CLASS = '.barStacked',
  CIRCLE_CLASS = '.circle',
  TEXT_CLASS = '.text',
  ARC_CLASS = '.arc',
  PATH_CLASS = '.path',
  RING_CLASS = '.ring',
  TICK_CLASS = '.tick',
  LEGEND_CLASS = '.legend',
}
