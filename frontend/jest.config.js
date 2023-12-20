module.exports = {
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
}