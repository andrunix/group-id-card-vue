module.exports = {
  "transform": {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.{js,vue}",
    "!**/node_modules/**"
  ]
}
