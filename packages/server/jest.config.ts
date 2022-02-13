import type { Config } from '@jest/types';

const configBase: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  resetMocks: true,
  passWithNoTests: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

const unitConfig: Config.InitialOptions = {
  ...configBase,
  displayName: 'unit',
  roots: ['src'],
};

const e2eConfig: Config.InitialOptions = {
  ...configBase,
  displayName: 'e2e',
  roots: ['test'],
};

const toolsConfig: Config.InitialOptions = {
  ...configBase,
  displayName: 'tools',
  roots: ['tools'],
};

const configs = {
  projects: [unitConfig, e2eConfig, toolsConfig],
};

export default configs;
