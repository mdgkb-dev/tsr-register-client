// eslint-disable-next-line simple-import-sort/imports
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import 'dayjs/locale/ru';
import '@/assets/element-variables.scss';
import '@/router/componentHooks';
import Provider from '@/services/Provider';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);

import Maska from 'maska';
app.use(Maska);

Provider.router = router;
Provider.store = store;

import DateTimeFormatter from '@/services/DateFormat';
app.config.globalProperties.$dateTimeFormatter = new DateTimeFormatter('ru-RU');

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

router.isReady().then(() => {
  app.mount('#app');
});
