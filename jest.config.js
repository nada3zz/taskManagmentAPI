module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/src/app/api/**/__tests__/**/*.test.ts'],
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['./src/jest.setup.ts'],
};
  
