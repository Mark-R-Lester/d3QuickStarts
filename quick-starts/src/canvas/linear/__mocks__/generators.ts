import { createMockSelection } from '../../../__mocks__/selection'

jest.mock('d3', () => ({
  select: jest.fn().mockReturnValue({
    append: jest.fn().mockReturnThis(),
    attr: jest.fn().mockReturnThis(),
    style: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    selectAll: jest.fn().mockReturnThis(),
    data: jest.fn().mockReturnThis(),
    enter: jest.fn().mockReturnThis(),
    exit: jest.fn().mockReturnThis(),
    remove: jest.fn().mockReturnThis(),
  }),
}))

// Helper for selection and transition
const getMockSelectionAndTransition = () => ({
  element: createMockSelection<SVGGElement>(),
  transition: jest.fn(),
})

// Standalone getGenerators mock
export const getGenerators = jest.fn().mockReturnValue({
  linear: {
    horizontal: {
      area: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
      barGroup: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
      barStack: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
      bars: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
      line: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
      points: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
      text: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
      axis: {
        bottom: jest.fn().mockReturnValue({
          elementDomain: createMockSelection<SVGElement>(),
          elementTicks: createMockSelection<SVGGElement>(),
          elementText: createMockSelection<SVGGElement>(),
        }),
        top: jest.fn().mockReturnValue({
          elementDomain: createMockSelection<SVGElement>(),
          elementTicks: createMockSelection<SVGGElement>(),
          elementText: createMockSelection<SVGGElement>(),
        }),
      },
    },
    vertical: {
      bars: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
      line: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
      points: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
      text: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
      axis: {
        left: jest.fn().mockReturnValue({
          elementDomain: createMockSelection<SVGElement>(),
          elementTicks: createMockSelection<SVGGElement>(),
          elementText: createMockSelection<SVGGElement>(),
        }),
        right: jest.fn().mockReturnValue({
          elementDomain: createMockSelection<SVGElement>(),
          elementTicks: createMockSelection<SVGGElement>(),
          elementText: createMockSelection<SVGGElement>(),
        }),
      },
    },
  },
  radialArc: {
    radial: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
    text: {
      follow: jest.fn().mockReturnValue({
        elementText: createMockSelection<SVGGElement>(),
        elementArcs: createMockSelection<SVGGElement>(),
        transition: jest.fn(),
      }),
      horizontal: jest.fn().mockReturnValue({
        elementText: createMockSelection<SVGGElement>(),
        transition: jest.fn(),
      }),
      rotated: jest.fn().mockReturnValue({
        elementText: createMockSelection<SVGGElement>(),
        transition: jest.fn(),
      }),
      spoke: jest.fn().mockReturnValue({
        elementText: createMockSelection<SVGGElement>(),
        transition: jest.fn(),
      }),
    },
  },
  radialCentroid: {
    area: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
    axis: jest.fn().mockReturnValue({
      textElement: createMockSelection<SVGGElement>(),
      ringsElement: createMockSelection<SVGGElement>(),
      transition: jest.fn(),
    }),
    line: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
    points: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
    spokes: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
  },
  plotted: {
    line: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
    text: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
    points: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
  },
  unbound: {
    legend: jest.fn().mockReturnValue({
      elementShape: createMockSelection<SVGElement>(),
      elementText: createMockSelection<SVGElement>(),
      transition: jest.fn(),
    }),
    text: jest.fn().mockReturnValue(getMockSelectionAndTransition()),
  },
})
