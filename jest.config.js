module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
