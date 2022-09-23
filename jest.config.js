module.exports = {
    
  runner: "groups",
  collectCoverage: true,
  coverageReporters: [
    "html",
    "text"
  ],
  coverageThreshold: {
    global: {
    statements: 40
    }
  },
  verbose: true
}