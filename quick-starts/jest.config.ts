import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  verbose: true,

  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(lit-element|lit-html)/)'],

  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}

export default config
