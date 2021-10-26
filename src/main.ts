// eslint-disable-next-line simple-import-sort/imports
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { setupElementPlusComponents, setupElementPlusPlugins } from '@/plugins/ElementPlus';

import 'dayjs/locale/ru';
import '@/assets/element-variables.scss';
import '@/router/componentHooks';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(setupElementPlusComponents);
app.use(setupElementPlusPlugins);

router.isReady().then(() => {
  app.mount('#app');
});
