module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js",
      appId: "ee.toothy.app",
      builderOptions: {
        win: {
          target: "nsis",
          // requestedExecutionLevel: "highestAvailable",
        },
        nsis: {
          guid: "3e32c88f-fd54-4a7c-ae39-3abfcd273234",
          include: "build/installer.nsh",
          perMachine: true,
          oneClick: false,
        },
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
};
