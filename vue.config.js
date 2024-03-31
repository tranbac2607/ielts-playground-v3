const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "./scss/_variables.scss";
        `,
      },
      scss: {
        additionalData: `@import "./scss/_variables.scss";`,
      },
      less: {
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff',
        },
      },
    },
  },
});
