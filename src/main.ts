// eslint-disable-next-line simple-import-sort/imports
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';

import 'dayjs/locale/ru';
import '@/assets/element-variables.scss';
import '@/router/componentHooks';
import Provider from '@/services/Provider/Provider';

import './assets/styles/element-variables.scss';
import Maska from 'maska';
import DateTimeFormatter from '@/services/DateFormat';

import ClassHelper from '@/services/ClassHelper';
import StringsService from '@/services/Strings';

const app = createApp(App);
app.use(store);
app.use(router);
// app.use(ElementPlus);

app.use(Maska);

Provider.router = router;
Provider.store = store;

app.config.globalProperties.$dateTimeFormatter = new DateTimeFormatter('ru-RU');
app.config.globalProperties.$classHelper = ClassHelper;
app.config.globalProperties.$stringsService = StringsService;
// app.use(setupElementPlusComponents, { locale: ru });
// app.use(setupElementPlusPlugins);

app.directive('click-outside', {
  mounted(el, binding) {
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

router.isReady().then(() => {
  app.mount('#app');
});
