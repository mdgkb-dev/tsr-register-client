export default {
  lintOnSave: false,
  devServer: {
    proxy: process.env.DEV_BACKEND_URL,
  },
};
