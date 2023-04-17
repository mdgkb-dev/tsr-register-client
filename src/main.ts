// eslint-disable-next-line simple-import-sort/imports
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';

import 'dayjs/locale/ru';
import '@/assets/element-variables.scss';
import '@/router/componentHooks';
import Provider from '@/services/Provider/Provider';

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
app.config.globalProperties.$classHelper = ClassHelper;
app.use(setupElementPlusComponents, { locale: ru });
app.use(setupElementPlusPlugins);

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ru from 'element-plus/es/locale/lang/ru';

import { setupElementPlusComponents, setupElementPlusPlugins } from '@/plugins/ElementPlus';
import ClassHelper from '@/services/ClassHelper';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

router.isReady().then(() => {
  app.mount('#app');
});
