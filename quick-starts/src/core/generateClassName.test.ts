import { v4 as uuidv4 } from 'uuid'
import { generateClassName } from './generateClassName'

// Mock the uuid module
jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

describe('generateClass', () => {
  const mockUuid = '123e4567-e89b-12d3-a456-426614174000'

  beforeEach(() => {
    jest.clearAllMocks()
    ;(uuidv4 as jest.Mock).mockReturnValue(mockUuid)
  })

  it('should generate class and className with a valid className', () => {
    const result = generateClassName('barGroup')
    expect(result).toEqual({
      dotClassName: `.barGroup_${mockUuid}`,
      className: `barGroup_${mockUuid}`,
    })
    expect(uuidv4).toHaveBeenCalledTimes(1)
  })

  it('should handle an empty className correctly', () => {
    const result = generateClassName('')
    expect(result).toEqual({
      dotClassName: `._${mockUuid}`,
      className: `_${mockUuid}`,
    })
    expect(uuidv4).toHaveBeenCalledTimes(1)
  })
})
