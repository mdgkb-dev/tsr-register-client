module.exports = {
  lintOnSave: false,
  devServer: {
    port: process.env.VUE_APP_PORT,
    disableHostCheck: true,
    host: 'localhost',
    proxy: process.env.DEV_BACKEND_URL,
    port: 8082,
  },
};
