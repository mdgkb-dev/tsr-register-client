// const AutoImport = require('unplugin-auto-import/webpack');
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import svgLoader from 'vite-svg-loader';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      // disableHostCheck: true,
      host: process.env.VITE_APP_HOST,
      port: process.env.VITE_APP_PORT,
      proxy: {
        '/api': {
          ws: true,
          target: process.env.VITE_APP_API_HOST,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            sourse: ['src'],
          },
        },
      }),
      svgLoader({ svgo: false }),
      Components({
        resolvers: [ElementPlusResolver()],
        // dts: true,
        dirs: ['src/components', 'src/services/components', 'src/views'],
      }),
      AutoImport({
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
            '@/services/Main': ['Period', 'Time', 'Scheduler'],
          },
        ],
        resolvers: [ElementPlusResolver()],
        dirs: ['srs/classes', 'srs/services/**'],

        vueTemplate: true,
        dts: true,
        eslintrc: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
    },
  });
  // lintOnSave: false,
  // outputDir: './test',
  // configureWebpack: {
  //   devtool: 'source-map',
  // },
  // transpileDependencies: [
  //   // can be string or regex
  //   // 'vue-chartjs',
  //   // 'chart.js',
  // ],
  // configureWebpack: {
  //   plugins: [
  //     require('unplugin-auto-import/webpack').default({
  //       include: [
  //         '.ts',
  //         /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
  //         /\.vue$/,
  //         /\.vue\?vue/, // .vue
  //         /\.md$/, // .md
  //       ],
  //       imports: [
  //         'vue',
  //         {
  //           'srs/services/classes': ['ClassHelper'],
  //           'srs/classes': ['Event'],
  //         },
  //       ],
  //       resolvers: [ElementPlusResolver()],
  //       dirs: ['srs/classes', 'srs/services'],
  //
  //       vueTemplate: true,
  //       dts: true,
  //       eslintrc: {
  //         enabled: true,
  //       },
  //     }),
  //   ],
  // },
  // chainWebpack: (config) => {
  //   const svgRule = config.module.rule('svg');
  //
  //   svgRule.uses.clear();
  //
  //   svgRule.delete('type');
  //   svgRule.delete('generator');
  //   svgRule
  //     .use('vue-loader')
  //     .loader('vue-loader-v16') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
  //     .end()
  //     .use('vue-svg-loader')
  //     .loader('vue-svg-loader')
  //     .options({
  //       svgo: {
  //         plugins: [{ cleanupIDs: false }, { collapseGroups: false }, { removeEmptyContainers: false }],
  //       },
  //     });
  // },
};
