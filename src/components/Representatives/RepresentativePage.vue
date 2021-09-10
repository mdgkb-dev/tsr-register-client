<template>
  <div v-if="mount" class="representative-page-container">
    <el-row>
      <RepresentativePageInfo />
    </el-row>
    <el-row>
      <el-collapse>
        <el-form
          ref="form"
          :status-icon="true"
          :inline-message="true"
          :model="representative"
          label-width="150px"
          :rules="rules"
          @submit.prevent="submitForm"
        >
          <div>
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Паспортные данные</h2>
              </template>
              <HumanForm :store-name="'representatives'" />
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
import MainHeader from '@/classes/shared/MainHeader';
import DocumentForm from '@/components/DocumentForm.vue';
import HumanForm from '@/components/HumanForm.vue';
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
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const representative: Ref<IRepresentative> = computed(() => store.getters['representatives/representative']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.representativeId);
    const mount: Ref<boolean> = ref(false);
    const rules = RepresentativeRules;

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      let title: string;
      if (!route.params.representativeId) {
        store.commit('representatives/resetRepresentative');
        title = 'Создать представителя';
      } else {
        await store.dispatch('representatives/get', route.params.representativeId);
        title = representative.value.human.getFullName();
      }
      pushToLinks(['/representatives'], ['Список представителей']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
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
