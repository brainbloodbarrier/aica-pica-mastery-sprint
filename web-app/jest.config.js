const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'lib/**/*.{js,jsx,ts,tsx}',
    '!lib/cn.ts', // Simple re-export, no need to test
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/jest.config.js',
  ],
  // Coverage thresholds - WS1 focuses on core lib files
  // Full coverage will be achieved incrementally in WS2+
  coverageThreshold: {
    'lib/utils.ts': {
      statements: 50,
      branches: 50,
      functions: 30,
      lines: 50,
    },
    'lib/hearts.ts': {
      statements: 65,
      branches: 55,
      functions: 80,
      lines: 65,
    },
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
