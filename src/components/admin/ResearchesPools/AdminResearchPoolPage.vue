<template>
  <PageTopSections v-if="mounted" :components="components" />
</template>

<script setup lang="ts">
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

import AdminResearchPageInfo from './AdminResearchPageInfo.vue';
import AdminResearchPageQuestions from './AdminResearchPageQuestions.vue';
// import AdminResearchPageSponsors from './AdminResearchPageSponsors.vue';

const mounted = ref(false);
const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);

const components = {
  AdminResearchPageInfo: AdminResearchPageInfo,
  AdminResearchPageQuestions: AdminResearchPageQuestions,
  // AdminResearchPageSponsors: AdminResearchPageSponsors,
};

const load = async () => {
  await Provider.loadItem();
  mounted.value = true;
  return;
};
//
// const toResearch = async () => {
//   Provider.router.push(`/researches/${research.value.slug}`);
// };
//
const remove = async () => {
  ElMessageBox.confirm('Вы уверены, что хотите удалить?', {
    distinguishCancelAndClose: true,
    confirmButtonText: 'Удалить',
    cancelButtonText: 'Отмена',
  }).then(async () => {
    await Provider.store.dispatch('researches/remove', Provider.route().params['id']);
    await Provider.router.push('/admin/researches');
  });
};

Hooks.onBeforeMount(load, {
  adminHeader: {
    title: computed(() => (Provider.route().params['id'] ? research.value.name : 'Добавить исследование')),
    showBackButton: true,
    buttons: [{ text: 'Удалить', type: 'warning-button', action: remove }],
  },
});
// Hooks.onBeforeRouteLeave();
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.field {
  width: 100%;
  height: 100%;
  background: red;
  padding: 10px;
}

.tab {
  font-size: 12px;
  text-transform: uppercase;
  color: #b0a4c0;
  border: 1px solid #999999;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  background: #f5f5f5;
  margin: -0.5px;
}

.tab:hover {
  background: $custom-background;
}

.selected-tab {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: $site_dark_gray;
  position: relative;
  border: 1px solid #343d5c;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  background: $custom-background;
  margin: -0.5px;
  z-index: 1;
}
</style>
