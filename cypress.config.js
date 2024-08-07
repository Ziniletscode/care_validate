const { defineConfig } = require("cypress");
// const { beforeRunHook} = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  env: {
    url: "https://careglp-staging.carevalidate.com/login",
  
  },
  
  // reporterOptions: {
  //   // charts: true,
  //   // reportPageTitle: 'custom-title',
  //   // embeddedScreenshots: true,
  //   // inlineAssets: true,
  //   // saveAllAttempts: false,
  //   ignoreVideos : false,
  // },
  retries: {
    runMode: 1,

  },
e2e: {

    setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);
      // on('before:run', async (details) => {
      //   console.log('override before:run');
      //   await beforeRunHook(details);
      // });
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/*.js'
  }
});



