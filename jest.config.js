module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  rootDir: '.',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/views/**/*.vue',
    '<rootDir>/src/api/**/*.ts',
    '<rootDir>/src/store/**/mutations/*.ts',
    '<rootDir>/src/store/**/actions/*.ts',
  ],
};
