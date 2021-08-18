<template>
  <div v-if="mount" class="representative-page-container">
    <PageHead :title="title" :links="links" :show-save-button="true" @submitForm="submitForm" />
    <el-row>
      <RepresentativePageInfo :representative="representative" />
    </el-row>
    <el-row>
      <el-collapse>
        <el-form ref="form" :status-icon="true" :model="representative" label-width="150px" :rules="rules" @submit.prevent="submitForm">
          <div>
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Паспортные данные</h2>
              </template>
              <HumanForm :human="representative.human" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Документы</h2>
              </template>
              <DocumentForm :store-module="'representatives'" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Подопечные</h2>
              </template>
              <RepresentativeToPatientForm />
            </el-collapse-item>
          </div>
        </el-form>
      </el-collapse>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import RepresentativeRules from '@/classes/representatives/RepresentativeRules';
import DocumentForm from '@/components/DocumentForm.vue';
import HumanForm from '@/components/HumanForm.vue';
import PageHead from '@/components/PageHead.vue';
import RepresentativePageInfo from '@/components/Representatives/RepresentativePageInfo.vue';
import RepresentativeToPatientForm from '@/components/Representatives/RepresentativeToPatientForm.vue';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RepresentativeTypePage',
  components: {
    HumanForm,
    DocumentForm,
    RepresentativeToPatientForm,
    RepresentativePageInfo,
    PageHead,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const representative: Ref<IRepresentative> = computed(() => store.getters['representatives/representative']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(false);
    const mount: Ref<boolean> = ref(false);
    const rules = RepresentativeRules;
    const title: Ref<string> = ref('');

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      if (!route.params.representativeId) {
        isEditMode.value = false;
        store.commit('representatives/resetRepresentative');
        title.value = 'Создать представителя';
      } else {
        isEditMode.value = true;
        await store.dispatch('representatives/get', route.params.representativeId);
        title.value = representative.value.human.getFullName();
      }
      pushToLinks(['/representatives'], ['Список представителей']);
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(representative, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;

      await submitHandling('representatives', representative.value, next);
    };

    return {
      representative,
      form,
      isEditMode,
      links,
      mount,
      rules,
      title,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';

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
</style>
