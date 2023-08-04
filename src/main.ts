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

import './assets/styles/element-variables.scss';

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
app.config.globalProperties.$stringsService = StringsService;
app.use(setupElementPlusComponents, { locale: ru });
app.use(setupElementPlusPlugins);

app.directive('click-outside', {
  mounted(el, binding, vnode) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
});

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ru from 'element-plus/es/locale/lang/ru';

import { setupElementPlusComponents, setupElementPlusPlugins } from '@/plugins/ElementPlus';
import ClassHelper from '@/services/ClassHelper';
import StringsService from '@/services/Strings';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

router.isReady().then(() => {
  app.mount('#app');
});
