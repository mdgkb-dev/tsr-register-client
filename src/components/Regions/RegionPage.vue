<template>
  <div v-if="mount">
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form ref="form" :status-icon="true" :model="region" label-width="30%" label-position="left" style="max-width: 800px">
          <el-form-item label="Представитель мужского пола" prop="parentMaleType">
            <el-input v-model="region.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Region from '@/classes/Region';
import MainHeader from '@/classes/shared/MainHeader';
import IRegion from '@/interfaces/IRegion';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';

export default defineComponent({
  name: 'RegionPage',
  setup() {
    const store = useStore();
    const route = useRoute();

    const region: Ref<IRegion> = ref(new Region());
    const isEditMode: Ref<boolean> = ref(!!route.params.RegionId);
    const mount: Ref<boolean> = ref(false);

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);

    onBeforeMount(async () => {
      let title: string;
      if (!route.params.regionsId) {
        store.commit('regions/set', new Region());
        title = 'Создать регион';
      } else {
        title = 'Редактировать регион';
        await store.dispatch('regions/get', route.params.RegionId);
        region.value = store.getters['regions/item'];
      }

      pushToLinks(['/regions'], ['Список представителей']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      store.commit('main/setActiveMenu', 'Regions');
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(region, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;

      await submitHandling('Regions', region.value, next, 'regions');
    };

    return {
      region,
      links,
      mount,
      submitForm,
    };
  },
});
</script>
