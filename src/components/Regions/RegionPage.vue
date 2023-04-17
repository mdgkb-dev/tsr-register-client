<template>
  <div v-if="mount">
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form ref="form" :status-icon="true" :model="region" label-width="30%" label-position="left" style="max-width: 800px">
          <el-form-item label="Название региона" prop="name">
            <el-input v-model="region.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';

import Region from '@/classes/Region';
import MainHeader from '@/classes/shared/MainHeader';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'RegionPage',
  setup() {
    const region: Ref<Region> = ref(new Region());
    const isEditMode: Ref<boolean> = ref(!!Provider.route().params.regionId);
    const mount: Ref<boolean> = ref(false);

    // const { links, pushToLinks } = useBreadCrumbsLinks();
    // const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    // const { submitHandling } = useForm(isEditMode.value);

    onBeforeMount(async () => {
      let title: string;
      if (!Provider.route().params.regionId) {
        Provider.store.commit('regions/set', new Region());
        title = 'Создать регион';
      } else {
        title = 'Редактировать регион';
        await Provider.store.dispatch('regions/get', Provider.route().params.regionId);
        region.value = Provider.store.getters['regions/item'];
      }

      // pushToLinks(['/regions'], ['Список представителей']);
      Provider.store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      Provider.store.commit('main/setActiveMenu', 'Regions');
      mount.value = true;

      // window.addEventListener('beforeunload', beforeWindowUnload);
      // watch(region, formUpdated, { deep: true });
    });

    // onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    //   showConfirmModal(submitForm, next);
    // });
    //
    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      // saveButtonClick.value = true;
      // await submitHandling('regions', region.value, next, 'regions');
    };

    return {
      region,
      // links,
      mount,
      submitForm,
    };
  },
});
</script>
