// eslint-disable-next-line simple-import-sort/imports
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
// import { components, plugins } from '@/plugins/ElementPlus';
import { setupElementPlusComponents, setupElementPlusPlugins } from '@/plugins/ElementPlus';

import 'dayjs/locale/ru';
import '@/assets/element-variables.scss';
import '@/router/componentHooks';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(setupElementPlusComponents);
app.use(setupElementPlusPlugins);

// for (const [, component] of Object.entries(components)) {
//   app.component(component.name, component);
// }
// components.forEach((component) => {
//   app.use(component);
// });

// plugins.forEach((plugin) => {
//   app.use(plugin);
// });

router.isReady().then(() => {
  app.mount('#app');
});
