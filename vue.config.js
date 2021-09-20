module.exports = {
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: process.env.VUE_APP_PORT,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_HOST,
      },
    },
  },
};
