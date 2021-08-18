<template>
  <div v-if="mount">
    <PageHead :title="title" :links="links" :show-save-button="true" @submitForm="submitForm" />
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form
          ref="form"
          :status-icon="true"
          :model="anthropometry"
          label-width="180px"
          label-position="left"
          :rules="rules"
          style="max-width: 800px"
        >
          <el-form-item label="Название параметра" prop="name">
            <el-input v-model="anthropometry.name"></el-input>
          </el-form-item>
          <el-form-item label="Единицы измерения" prop="measure">
            <el-input v-model="anthropometry.measure"></el-input>
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

import Anthropometry from '@/classes/anthropometry/Anthropometry';
import AnthropometryRules from '@/classes/anthropometry/AnthropometryRules';
import PageHead from '@/components/PageHead.vue';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'AnthropometryPage',
  components: {
    PageHead,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const anthropometry: Ref<IAnthropometry> = ref(new Anthropometry());
    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.anthropometryId);
    const mount: Ref<boolean> = ref(false);
    const rules = AnthropometryRules;
    const title: Ref<string> = ref('');

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      if (!route.params.anthropometryId) {
        store.commit('anthropometry/set', new Anthropometry());
        title.value = 'Создать параметр';
      } else {
        title.value = 'Редактировать параметр';
        await store.dispatch('anthropometry/get', route.params.anthropometryId);
        anthropometry.value = store.getters['anthropometry/anthropometry'];
      }

      pushToLinks(['/anthropometry'], ['Антропометрия']);
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(anthropometry, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;

      await submitHandling('anthropometry', anthropometry.value, next);
    };

    return {
      anthropometry,
      form,
      links,
      mount,
      rules,
      title,
      submitForm,
    };
  },
});
</script>
