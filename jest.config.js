/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  // Increase timeout cos things like db connection might default exceed 5000ms timeout
  testTimeout: 3000000,
  testEnvironment: 'node',
};
