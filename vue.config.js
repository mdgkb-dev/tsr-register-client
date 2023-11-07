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
  transpileDependencies: [
    // can be string or regex
    'vue-chartjs',
    'chart.js',
  ],
  chainWebpack: (config) => {
    // Visualize size of webpack output files with an interactive zoomable treemap
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    // const options = {
    //   webpackBundleAnalyzer: {
    //     openAnalyzer: false,
    //   },
    // };
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(BundleAnalyzerPlugin)
    //   .init((Plugin) => new Plugin(options));

    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader-v16') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [{ cleanupIDs: false }, { collapseGroups: false }, { removeEmptyContainers: false }],
        },
      });
  },
};
