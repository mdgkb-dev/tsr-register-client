import { createApp } from 'vue';
import ElementPlus, { ElMessage } from 'element-plus';
import locale from 'element-plus/lib/locale/lang/ru';
import fillDateFormat from '@/services/DateFormat';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/element-variables.scss';
import 'dayjs/locale/ru';

const app = createApp(App);
app.config.globalProperties.$dateFormatRu = fillDateFormat;
app.use(store);
app.use(router);
app.use(ElementPlus, { locale, ElMessage });

router.isReady().then(() => {
  app.mount('#app');
});
