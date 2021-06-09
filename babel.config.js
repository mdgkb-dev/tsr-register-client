module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          const customName = name.slice(3);
          return `element-plus/packages/theme-chalk/src/${customName}.scss`;
        },
      },
    ],
  ],
};
