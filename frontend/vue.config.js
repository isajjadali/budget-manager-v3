const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  lintOnSave: false, //process.env.NODE_ENV !== 'production',
});
