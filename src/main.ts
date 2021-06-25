import './router/componentHooks';
import 'dayjs/locale/ru';
import './assets/element-variables.scss';

import {
  ElAffix,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCard,
  ElCheckbox,
  ElCheckTag,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElContainer,
  ElDatePicker,
  ElDialog,
  ElDivider,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElImage,
  ElInfiniteScroll,
  ElInput,
  ElInputNumber,
  ElLoading,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElOption,
  ElPopover,
  ElRadio,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSpace,
  ElSubmenu,
  ElTable,
  ElTableColumn,
  ElTag,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  ElTree,
  ElUpload,
} from 'element-plus';
import locale from 'element-plus/lib/locale';
import lang from 'element-plus/lib/locale/lang/ru';
import { createApp } from 'vue';

import fillDateFormat from '@/services/DateFormat';

import App from './App.vue';
import router from './router';
import store from './store';

locale.use(lang);
const components = [
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElAffix,
  ElButton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElCard,
  ElCheckbox,
  ElCheckTag,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElContainer,
  ElDatePicker,
  ElDialog,
  ElDivider,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElImage,
  ElInput,
  ElInputNumber,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElPopover,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSubmenu,
  ElSpace,
  ElTable,
  ElTableColumn,
  ElTag,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  ElTree,
  ElUpload,
  ElRadio,
];
const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification];
const app = createApp(App);
app.config.globalProperties.$dateFormatRu = fillDateFormat;
app.use(store);
app.use(router);

components.forEach((component) => {
  app.component(component.name, component);
});
plugins.forEach((plugin) => {
  app.use(plugin);
});

router.isReady().then(() => {
  app.mount('#app');
});
