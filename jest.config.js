module.exports = {
    coveragePathIgnorePatterns: [
      "__tests__/lib/"
    ],
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js"
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: ".test.ts$",
};
