import { Selection } from 'd3'

declare module 'd3-selection' {
  interface Selection<
    GElement extends d3.BaseType,
    Datum,
    PElement extends d3.BaseType,
    PDatum,
  > {
    getAppendCalls: () => { type: string }[]
    getAttrCalls: () => { name: string; value: any }[]
  }
}

let centralizedStore: Record<string, Selection<any, any, HTMLElement, any>[]> =
  {
    defs: [],
    stop: [],
    orthogonalGradient: [],
    radialGradient: [],
  }

export const resetMockSelectionStore = () => {
  Object.keys(centralizedStore).forEach((key) => (centralizedStore[key] = []))
  appendCalls.length = 0
  attrCalls.length = 0
}

// Array to store all append calls
const appendCalls: { type: string }[] = []

// Array to store all attr calls
const attrCalls: { name: string; value: any }[] = []

export const createMockSelection = <T extends SVGElement>(): Selection<
  T,
  any,
  HTMLElement,
  any
> => {
  const mockSelection = {
    append: jest.fn().mockImplementation((type: string) => {
      appendCalls.push({ type })
      let selection
      switch (type) {
        case 'defs':
          selection = createMockSelection<SVGDefsElement>()
          centralizedStore.defs.push(selection)
          return selection
        case 'orthogonalGradient':
          selection = createMockSelection<SVGLinearGradientElement>()
          centralizedStore.orthogonalGradient.push(selection)
          return selection
        case 'radialGradient':
          selection = createMockSelection<SVGRadialGradientElement>()
          centralizedStore.radialGradient.push(selection)
          return selection
        case 'stop':
          selection = createMockSelection<SVGStopElement>()
          centralizedStore.stop.push(selection)
          return selection
        default:
          return createMockSelection<SVGElement>()
      }
    }),
    attr: jest.fn().mockImplementation((name: string, value: any) => {
      attrCalls.push({ name, value })
      return mockSelection
    }),
    style: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    selectAll: jest.fn().mockImplementation((type: string) => {
      return createMockSelection<SVGElement>()
    }),
    data: jest.fn().mockReturnThis(),
    enter: jest.fn().mockReturnThis(),
    exit: jest.fn().mockReturnThis(),
    remove: jest.fn().mockReturnThis(),
    getAppendCalls: () => appendCalls,
    getAttrCalls: () => attrCalls,
  } as any
  return mockSelection
}
