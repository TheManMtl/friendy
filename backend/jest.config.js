module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '\\.test\\.tsx$',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};
