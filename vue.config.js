module.exports = {
  lintOnSave: false,
  devServer: {
    host: process.env.VUE_APP_HOST,
    port: process.env.VUE_APP_PORT,
    proxy: process.env.DEV_BACKEND_URL,
    disableHostCheck: true,
  },
};
