const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  
  testDir: './tests',
  
  use: {
    baseURL: 'http://localhost:8081',
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],

});