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
};
