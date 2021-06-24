module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    proxy: process.env.DEV_BACKEND_URL,
  },
};
