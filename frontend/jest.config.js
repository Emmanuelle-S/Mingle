module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy"
  },
};
