module.exports = {
    "roots": [
      "<rootDir>/typescript"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "collectCoverage": true,
    "collectCoverageFrom": ["typescript/**/*.{js,jsx,ts,tsx}"],
    "coverageReporters": [
      "json",
      "html"
    ]
  }