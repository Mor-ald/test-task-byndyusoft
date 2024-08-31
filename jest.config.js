/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'jsx', "ts", "tsx"],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ["constants"],
  testPathIgnorePatterns: ["src/vite-env.d.ts"]
};