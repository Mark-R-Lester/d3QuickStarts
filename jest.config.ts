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
      testPathIgnorePatterns: ["<rootDir>/node_modules/"],
      preset: "ts-jest",
      displayName: "visulaisation",
      testMatch: [
        "<rootDir>/quick-starts/**/*.test.ts",
        "<rootDir>/charts/**/*.test.ts",
      ],
    },
  ],
};
export default config;
