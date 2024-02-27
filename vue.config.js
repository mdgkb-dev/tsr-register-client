// const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
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
    // 'vue-chartjs',
    // 'chart.js',
  ],
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack').default({
        include: [
          '.ts',
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          {
            'srs/services/classes': ['ClassHelper'],
          },
        ],
        resolvers: [ElementPlusResolver()],
        dirs: ['srs/classes', 'srs/services/classes'],

        vueTemplate: true,
        dts: true,
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dirs: ['src/components', 'src/services/components', 'src/views'],
      }),
    ],
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule.delete('type');
    svgRule.delete('generator');
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
