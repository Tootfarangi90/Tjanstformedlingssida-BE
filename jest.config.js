module.exports = {
    
  runner: "groups",
  collectCoverage: true,
  coverageReporters: [
    "html",
    "text"
  ],
  coverageThreshold: {
    global: {
    statements: 50
    }
  },
  verbose: true
}

