// jest.config.js
module.exports = {
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest",
    },
    testEnvironment: "jsdom",
    setupFiles: ["<rootDir>/jest.setup.js"],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    testMatch: ["<rootDir>/src/components/ChatSendInput/__test__/**/*.test.(js|jsx|ts|tsx)"],
    transformIgnorePatterns: ["/node_modules/(?!your-module-to-transform).+\\.(js|jsx|ts|tsx)$"],
  };
  