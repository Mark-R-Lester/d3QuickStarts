import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  projects: [
    {
      testPathIgnorePatterns: ["node_modules"],
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "node"],
      preset: "ts-jest",
      displayName: "quick start",
      testMatch: [
        "<rootDir>/quick-starts/**/*.test.ts",
        "<rootDir>/charts/**/*.test.ts",
      ],
      moduleNameMapper: {
        d3: "<rootDir>/quick-starts/node_modules/d3/dist/d3.min.js",
      },
    },
  ],
};
export default config;
