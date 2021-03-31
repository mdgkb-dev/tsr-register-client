import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import store from "./store";
import "element-plus/lib/theme-chalk/index.css";

import "@/assets/global.css";

const app = createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router);

router.isReady().then(() => {
  app.mount("#app");
});
