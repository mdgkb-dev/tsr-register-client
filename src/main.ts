import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/ru';
import 'dayjs/locale/ru';

import { ElMessage } from 'element-plus';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { locale, ElMessage });
app.use(ElMessage);

router.isReady().then(() => {
  app.mount('#app');
});
