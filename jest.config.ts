import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app/server_app';
const baseTestDir = '<rootDir>/src/tests/server_app';

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	collectCoverage: true,
	collectCoverageFrom: [
		`${baseDir}/server_app/**/*.ts`,
		`${baseDir}/server_app2/**/*.ts`,
	],
	testMatch: [`${baseTestDir}/**/*test.ts`],
};

export default config;
