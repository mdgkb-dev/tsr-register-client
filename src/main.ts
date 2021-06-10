import './router/componentHooks';
import { createApp } from 'vue';
import {
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElAffix,
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
  ElInput,
  ElInputNumber,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElPopover,
  ElRow,
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
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus';
import fillDateFormat from '@/services/DateFormat';
import lang from 'element-plus/lib/locale/lang/ru';
import 'dayjs/locale/ru';
import locale from 'element-plus/lib/locale';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/element-variables.scss';

locale.use(lang);
const components = [
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElAffix,
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
  ElInput,
  ElInputNumber,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElPopover,
  ElRow,
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
