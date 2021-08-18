module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    host: process.env.VUE_APP_HOST,
    port: process.env.VUE_APP_PORT,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_HOST,
      },
    },
  },
};
