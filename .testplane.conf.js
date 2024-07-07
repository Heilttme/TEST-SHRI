module.exports = {
  sets: {
    desktop: {
      files: "test/testplane",
    },
  },

  browsers: {
    chrome: {
      automationProtocol: "devtools",
      headless: false,
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
  },

  plugins: {
    "html-reporter/testplane": {
      enabled: true,
    },
  },
};
