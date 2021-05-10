import { createApp } from 'vue';
import ElementPlus, { ElMessage } from 'element-plus';
import locale from 'element-plus/lib/locale/lang/ru';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/element-variables.scss';
import 'dayjs/locale/ru';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus, { locale, ElMessage });
app.use(ElMessage);

router.isReady().then(() => {
  app.mount('#app');
});
