/*
 * Text Enums
 */
export enum QsEnumAlignmentBaseline {
  AUTO = 'auto',
  BASELINE = 'baseline',
  TEXT_BOTTOM = 'text-bottom',
  TEXT_BEFORE_EDGE = 'text-before-edge',
  MIDDLE = 'middle',
  CENTRAL = 'central',
  TEXT_TOP = 'text-top',
  TEXT_AFTER_EDGE = 'text-after-edge',
  IDIOMATIC = 'ideographic',
  APHABETIC = 'alphabetic',
  HANGING = 'hanging',
  MATHETAMATICAL = 'mathematical',
  TOP = 'top',
  CENTER = 'center',
  BOTTOM = 'bottom',
}

export enum QsEnumTextAnchor {
  START = 'start',
  MIDDLE = 'middle',
  END = 'end',
}

export enum QsEnumTextFontWeight {
  BOLD = 'bold',
  BOLDER = 'bolder',
  LIGTHER = 'lighter',
  NORMAL = 'normal',
}

export enum QsEnumTextFontStyle {
  OBLIQUE = 'oblique',
  ITALIC = 'italic',
  NORMAL = 'normal',
}

export enum QsEnumTextDecorationLine {
  NORMAL = 'normal',
  OVERLINE = 'overline',
  LINE_THROUGH = 'line-through',
  UNDERLINE = 'underline',
  OVERLINE_UNDERLINE = 'overline underline',
}

export enum QsEnumTextFont {
  //  Sans Serif
  SANS_SERIF = 'Sans-Serif',
  ARIAL = 'arial',
  VERDANA = 'verdana',
  HELVETICA = 'helvetica',

  // Serif
  SERIF = 'Serif',
  TIMES_NEW_ROMAN = 'times new roman',
  GEORGIA = 'georgia',
  GARMOND = 'garamond',

  // Mono spaced
  MONOSPACE = 'monospace',
  COURIER_NEW = 'courier new',
  LUCIDA_CONSOLE = 'lucida console',
  COURIER = 'courier',

  // Cursive
  CURVSIVE = 'cursive',
  BRUSH_SCRIPT_MT = 'Brush Script MT',
  COMIC_SANS_MS = 'comic Sans MS',

  // Fantasy
  FANTASY = 'fantasy	',
  PAPYRUS = 'papyrus',
  IMPACT = 'Impact',
}

/*
 * Layer enums
 */
export enum QsEnumLayerType {
  DATA = 'data',
  UNBOUND = 'unbound',
}

/*
 * Line enums
 */
export enum QsEnumCurve {
  BASIS = 'basis',
  BUMP_X = 'bunpX',
  BUMP_Y = 'bumpY',
  LINEAR = 'linear',
  MONOTONE_X = 'monotoneX',
  MONOTONE_Y = 'MonotoneY',
  NATURAL = 'natural',
  STEP = 'step',
  STEP_BEFORE = 'setpBefore',
  STEP_AFTER = 'stepAfter',
}

export enum QsEnumLineJoin {
  ROUND = 'round',
  BEVEL = 'bevel',
  MITER = 'miter',
}

export enum QsEnumLineCap {
  ROUND = 'round',
  BUTT = 'butt',
  SQUARE = 'square',
}

/*
 * Scale enums
 */
export enum QsEnumScaleType {
  BANDED = 'banded',
  LINEAR = 'linear',
}

export enum QsEnumAxisScaleType {
  BANDED = 'banded',
  POINT = 'point',
}

export enum QsEnumDataScale {
  LINEAR = 'linear',
  POWER = 'pow',
  SYMLOG = 'symlog',
  SQRT = 'sqrt',
}

export enum QsEnumColorScale {
  ORDINAL = 'ordinal',
  SEQUENTIAL = 'sequential',
}

/**
 * Color enums
 */
export enum QsEnumColorLightBlues {
  AZURE = '#F0FFFF',
  MINTCREAM = '#F5FFFA',
  POWDER = '#E0F7FA',
  LAVENDERBLUE = '#E6E6FA',
  ZIRCON = '#F4F8FF',
  CELESTE = '#B2FFFF',
  LIGHTCYAN = '#E0FFFF',
  AQUA = '#00FFFF',
  CYAN = '#00FFFF',
  HONEYDEW = '#F0FFF0',
  POWDERBLUE = '#B0E0E6',
  ICEBLUE = '#99E6E6',
  AQUAMARINE = '#7FFFD4',
  SKYLIGHT = '#A1CAF1',
  BABYBLUE = '#89CFF0',
  LIGHTSKYBLUE = '#87CEFA',
  SKYBLUE = '#87CEEB',
  WINTERBLUE = '#A0CFEC',
  ARCTIC = '#D0EAFA',
  BREEZE = '#B3D4FF',
  COOLBLUE = '#A3BFFA',
  ROBINSEGG = '#00CCCC',
  PERIWINKLE = '#CCCCFF',
  TURQUOISE = '#40E0D0',
  CORNFLOWERBLUE = '#6495ED',
  CRYSTALBLUE = '#68A0B0',
  LIGHTBLUE = '#ADD8E6',
}

export enum QsEnumColorDarkBlues {
  DODGERBLUE = '#1E90FF',
  DEEPSKYBLUE = '#00B7EB',
  MEDIUMSLATEBLUE = '#7B68EE',
  BLUEVIOLET = '#8A2BE2',
  ROYALBLUE = '#4169E1',
  COBALTBLUE = '#0047AB',
  CADETBLUE = '#5F9EA0',
  STEELBLUE = '#4682B4',
  SLATEBLUE = '#6A5ACD',
  TEAL = '#008080',
  LAPIS = '#26619C',
  BLUE = '#0000FF',
  MEDIUMBLUE = '#0000CD',
  PRUSSIANBLUE = '#003153',
  ULTRAMARINE = '#120A8F',
  INDIGOBLUE = '#3F00FF',
  MARINE = '#2E2D88',
  INDIGO = '#4B0082',
  NAVY = '#000080',
  DARKBLUE = '#00008B',
  OCEAN = '#1B263B',
  NAVYSHADE = '#1B263B',
  MIDNIGHT = '#2B2D42',
  DEEPBLUE = '#1C2526',
  MIDNIGHTBLUE = '#191970',
}

export enum QsEnumColorLightGreens {
  MINTCREAM = '#F5FFFA',
  HONEYDEW = '#F0FFF0',
  PALEGREEN = '#98FB98',
  TEAGREEN = '#D0F0C0',
  SEAFOAM = '#93E9BE',
  CELADON = '#ACE1AF',
  MISTGREEN = '#B2D8B2',
  LIGHTGREEN = '#90EE90',
  DARKSEAGREEN = '#8FBC8F',
  PISTACHIO = '#93C572',
  SPRINGGREEN = '#00FF7F',
  MEDIUMSPRINGGREEN = '#00FA9A',
  GREENYELLOW = '#ADFF2F',
  PEAR = '#D1E231',
  SAGE = '#9CB071',
  OLIVINE = '#9AB973',
  ARTICHOKE = '#8F9779',
  CHARTREUSE = '#7FFF00',
  MINT = '#3EB489',
  SHAMROCK = '#33CC33',
  LIMEGREEN = '#32CD32',
  KELLYGREEN = '#4CBB17',
  LIMEADE = '#6F9A4D',
  APPLE = '#4FA83D',
  FERN = '#4F7942',
}

export enum QsEnumColorDarkGreens {
  LAWNGREEN = '#7CFC00',
  LIME = '#00FF00',
  MALACHITE = '#0BDA51',
  EMERALD = '#2ECC71',
  MEDIUMSEAGREEN = '#3CB371',
  JADE = '#00A86B',
  SHAMROCK = '#33CC33',
  OLIVEDRAB = '#6B8E23',
  VIRIDIAN = '#40826D',
  PEACOCKGREEN = '#2E8B57',
  SEAGREEN = '#2E8B57',
  MOSS = '#8A9A5B',
  PINE = '#01796F',
  BOTTLEGREEN = '#006A4E',
  FORESTGREEN = '#228B22',
  CHIVE = '#4A7043',
  SPINACH = '#4C7043',
  OLIVE = '#808000',
  DARKOLIVEGREEN = '#556B2F',
  BASIL = '#32612D',
  HUNTERGREEN = '#355E3B',
  FOREST = '#0B6623',
  CYPRESS = '#545A2C',
  GREEN = '#008000',
  EVERGREEN = '#05472A',
  DARKGREEN = '#006400',
}

export enum QsEnumColorGreys {
  GAINSBORO = '#DCDCDC',
  FOG = '#D7D7D7',
  LIGHTGRAY = '#D3D3D3',
  CLOUD = '#C5C6C7',
  MIST = '#B0B7BC',
  ASH = '#B2BEB5',
  SILVER = '#C0C0C0',
  PEWTER = '#96A8A1',
  SMOKE = '#738276',
  LIGHTSLATEGRAY = '#778899',
  SLATEGRAY = '#708090',
  STEEL = '#71797E',
  GRAY = '#808080',
  SHADOW = '#8A8A8A',
  DOVE = '#6D8299',
  SLATE = '#5A6E7F',
  GRANITE = '#676767',
  DIMGRAY = '#696969',
  STORM = '#4C5B61',
  IRON = '#48494B',
  CHARCOAL = '#36454F',
  ANCHOR = '#39424E',
  GUNMETAL = '#2C3539',
  SOOT = '#555555',
}

export enum QsEnumColorReds {
  LIGHTSALMON = '#FFA07A',
  SALMON = '#FA8072',
  CORAL = '#FF7F50',
  TOMATO = '#FF6347',
  ORANGERED = '#FF4500',
  SCARLET = '#FF2400',
  INDIANRED = '#CD5C5C',
  BRICK = '#CB4154',
  BLUSH = '#DE5D83',
  DARKSALMON = '#E9967A',
  VERMILION = '#E34234',
  ROSE = '#FF007F',
  CARDINAL = '#C41E3A',
  CHILI = '#C21807',
  CRIMSON = '#DC143C',
  FIREBRICK = '#B22222',
  RUBY = '#9B1D64',
  BERRY = '#A40000',
  RED = '#FF0000',
  GARNET = '#733635',
  CLARET = '#7F1734',
  MAROON = '#800000',
  BLOOD = '#8A0707',
  DARKRED = '#8B0000',
}

export enum QsEnumColorYellows {
  CORNSILK = '#FFF8DC',
  LIGHTYELLOW = '#FFFFE0',
  LEMONCHIFFON = '#FFFACD',
  LIGHTGOLDENRODYELLOW = '#FAFAD2',
  BLANCHEDALMOND = '#FFEBCD',
  CANARY = '#FFFF99',
  BUTTER = '#FFFF81',
  YELLOW = '#FFFF00',
  DAFFODIL = '#FFFF31',
  HONEY = '#FFC107',
  MANGO = '#FDCA40',
  SAFFRON = '#F4C430',
  KHAKI = '#F0E68C',
  DANDELION = '#F0E130',
  BANANA = '#FFE135',
  MUSTARD = '#FFDB58',
  PALEGOLDENROD = '#EEE8AA',
  BUTTERSCOTCH = '#E3B577',
  GOLD = '#FFD700',
  AMBER = '#FFBF00',
  TANGERINE = '#F28C38',
  MARIGOLD = '#EAA221',
  GOLDENROD = '#DAA520',
  DARKKHAKI = '#BDB76B',
  DARKGOLDENROD = '#B8860B',
}

export enum QsEnumColorPurples {
  LAVENDER = '#E6E6FA',
  THISTLE = '#D8BFD8',
  PLUM = '#DDA0DD',
  WISTERIA = '#C9A0DC',
  LILAC = '#C8A2C8',
  VIOLET = '#EE82EE',
  MAUVE = '#E0B0FF',
  HELIOTROPE = '#DF73FF',
  ORCHID = '#DA70D6',
  MEDIUMORCHID = '#BA55D3',
  MEDIUMPURPLE = '#9370DB',
  AMETHYST = '#9966CC',
  MULBERRY = '#C54B8C',
  PURPLERAIN = '#7442C8',
  DARKORCHID = '#9932CC',
  MEDIUMSLATEBLUE = '#7B68EE',
  BLUEVIOLET = '#8A2BE2',
  DARKVIOLET = '#9400D3',
  SLATEBLUE = '#6A5ACD',
  PURPLE = '#800080',
  GRAPE = '#6F2DA8',
  DARKMAGENTA = '#8B008B',
  EGGPLANT = '#614051',
  INDIGO = '#4B0082',
  DARKPURPLE = '#301934',
}

export enum QsEnumColorLightBrowns {
  CORNSILK = '#FFF8DC',
  ANTIQUEWHITE = '#FAEBD7',
  LINEN = '#FAF0E6',
  BISQUE = '#FFE4C4',
  BLANCHEDALMOND = '#FFEBCD',
  BEIGE = '#F5F5DC',
  WHEAT = '#F5DEB3',
  NAVAJOWHITE = '#FFDEAD',
  MOCCASIN = '#FFE4B5',
  PEACH = '#FFDAB9',
  CARAMEL = '#FFD59A',
  BISCUIT = '#FFCC99',
  APRICOT = '#FBCEB1',
  DESERTSAND = '#EDC9AF',
  ALMOND = '#EFDECD',
  BUFF = '#F0DC82',
  FLAX = '#EEDC82',
  SAND = '#C2B280',
  FAWN = '#E5AA70',
  SANDALWOOD = '#C2A665',
  CAMEL = '#C19A6B',
  OAK = '#C19A6B',
  TAN = '#D2B48C',
  BURLYWOOD = '#DEB887',
  CAFEAULAIT = '#A67B5B',
  SANDYBROWN = '#F4A460',
  ROSYBROWN = '#BC8F8F',
}

export enum QsEnumColorDarkBrowns {
  LATTE = '#C19A6B',
  CAMEL = '#C19A6B',
  OAK = '#C19A6B',
  PERU = '#CD853F',
  BURLYWOOD = '#DEB887',
  GOLDENROD = '#DAA520',
  BRONZE = '#CD7F32',
  SANDYBROWN = '#F4A460',
  CHOCOLATE = '#D2691E',
  COCOA = '#D2691E',
  CINNAMON = '#D2691E',
  PECAN = '#A57164',
  HAZELNUT = '#8B6F47',
  MOCHA = '#8B5A2B',
  CHESTNUT = '#954535',
  COCONUT = '#965A3E',
  CLAY = '#B66D3B',
  HICKORY = '#8B4C39',
  BROWN = '#A52A2A',
  RUSSET = '#80461B',
  SADDLEBROWN = '#8B4513',
  SIENNA = '#A0522D',
  COFFEE = '#6F4E37',
  TAUPE = '#483C32',
  ESPRESSO = '#4A2C2A',
  MAHOGANY = '#4A2C2A',
  SEPIA = '#704214',
  DARKGOLDENROD = '#B8860B',
}

export enum QsEnumColorOranges {
  PAPAYA = '#FFEFD5',
  PEACH = '#FFDAB9',
  APRICOT = '#FBCEB1',
  LIGHTSALMON = '#FFA07A',
  SALMON = '#FA8072',
  CORAL = '#FF7F50',
  NECTARINE = '#FF9966',
  MANGO = '#FFC107',
  SAFFRON = '#F4C430',
  CANTALOUPE = '#FF8243',
  TANGERINE = '#F28500',
  MANDARIN = '#F28C38',
  ORANGE = '#FFA500',
  CLEMENTINE = '#E77200',
  PUMPKIN = '#FF7518',
  CARROT = '#ED9121',
  TOMATO = '#FF6347',
  ORANGERED = '#FF4500',
  BITTERSWEET = '#FE6F5E',
  TANGELO = '#F94D00',
  DARKORANGE = '#FF8C00',
  PERSIMMON = '#EC5800',
  VERMILION = '#E34234',
  BURNTORANGE = '#CC5500',
  AMBER = '#FFBF00',
}
