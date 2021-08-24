<template>
  <div v-if="mount">
    <div class="table-background" style="width: 100%; margin-bottom: 20px">
      <el-form ref="form" :status-icon="true" :model="drug" label-width="30%" label-position="left" style="max-width: 800px">
        <el-form-item label="Наименование лекарства" prop="name">
          <el-input v-model="name"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Drug from '@/classes/drugs/Drug';
import MainHeader from '@/classes/shared/MainHeader';
import IDrug from '@/interfaces/drugs/IDrug';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'DrugPage',

  setup() {
    const store = useStore();
    const route = useRoute();

    const drug: Ref<IDrug> = computed(() => store.getters['drugs/drug']);
    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.drugId);
    const mount: Ref<boolean> = ref(false);

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      let title: string;
      if (!route.params.drugId) {
        store.commit('drugs/set', new Drug());
        title = 'Добавить лекарство';
      } else {
        await store.dispatch('drugs/get', route.params.drugId);
        title = drug.value.name;
      }

      pushToLinks(['/drugs'], ['Список лекарств']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(drug, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;

      await submitHandling('drugs', drug.value, next, 'drugs');
    };

    return {
      drug,
      form,
      mount,
    }
  },
});
</script>
