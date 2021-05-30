module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js",
      appId: "ee.toothy.app",
      win: {
        target: "nsis",
      },
      nsis: {
        include: "build/installer.nsh",
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
