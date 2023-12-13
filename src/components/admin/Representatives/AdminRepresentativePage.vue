<template>
  <MenuContainer v-if="mounted" min-menu-item-width="160px" height="calc(100% - 2px)" background="#DFF2F8">
    <template #menu>
      <div v-for="menu in menus" :key="menu.id">
        <div :class="{ 'selected-tab': activeMenu.id === menu.id, tab: activeMenu.id !== menu.id }" @click="changeMenu(menu.id)">
          {{ menu.name }}
        </div>
      </div>
    </template>
    <template #body>
      <component v-bind="menusProperties" :is="activeMenu.component" />
    </template>
  </MenuContainer>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Representative from '@/classes/Representative';
import RepresentativeRules from '@/classes/RepresentativeRules';
import RepresentativeContacts from '@/components/admin/Representatives/RepresentativeContacts.vue';
import RepresentativeDocuments from '@/components/admin/Representatives/RepresentativeDocuments.vue';
import RepresentativePageInfo from '@/components/admin/Representatives/RepresentativePageInfo.vue';
import RepresentativeToPatientForm from '@/components/admin/Representatives/RepresentativeToPatientForm.vue';
import HumanForm from '@/components/HumanForm.vue';
import CustomSection from '@/services/classes/page/CustomSection';
import MenuContainer from '@/services/components/MenuContainer.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminRepresentativePage',
  components: {
    HumanForm,
    RepresentativeToPatientForm,
    RepresentativePageInfo,
    MenuContainer,
    RepresentativeContacts,
    RepresentativeDocuments,
  },
  setup() {
    const menus: CustomSection[] = [
      CustomSection.Create('info', 'Паспортные данные', 'RepresentativePageInfo', 0, true),
      // CustomSection.Create('contacts', 'Контакты', 'RepresentativeContacts', 0, true),
      CustomSection.Create('documents', 'Документы', 'RepresentativeDocuments', 0, true),
      // CustomSection.Create('wards', 'Подопечные', 'RepresentativeWards', 0, true),
    ];
    const activeMenu: Ref<CustomSection> = ref(menus[0]);
    const representative: Ref<Representative> = computed(() => Provider.store.getters['representatives/item']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!Provider.route().params.representativeId);
    const rules = RepresentativeRules;

    const menusProperties = computed(() => {
      // if (activeMenu.value.component === 'PatientDiagnosis') {
      //   return { 'mkb-linker': representative.value };
      // }
      return {};
    });

    const changeMenu = (customSectionId: string) => {
      const section = menus.find((m: CustomSection) => m.id === customSectionId);
      if (!section) {
        return;
      }
      activeMenu.value = section;
      Provider.router.replace({ query: { menu: section.id as string } });
    };

    const load = async () => {
      await Provider.loadItem();
    };
    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: computed(() => (Provider.route().params['id'] ? representative.value?.human?.getFullName() : 'Добавить представителя')),
        showBackButton: true,
        buttons: [{ action: Hooks.submit() }],
      },
    });
    Hooks.onBeforeRouteLeave();

    return {
      representative,
      form,
      isEditMode,
      // links,
      mounted: Provider.mounted,
      rules,
      changeMenu,
      activeMenu,
      menus,
      menusProperties,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.modal-wrapper {
  width: 100%;
  height: 100%;
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
  cursor: pointer;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  background: $custom-background;
  margin: -0.5px;
  z-index: 1;
}
</style>
