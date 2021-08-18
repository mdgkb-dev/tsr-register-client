<template>
  <div v-if="mount">
    <PageHead :title="title" :links="links" :show-save-button="true" @submitForm="submitForm" />
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form
          ref="form"
          :status-icon="true"
          :model="insuranceCompany"
          :rules="rules"
          label-width="180px"
          label-position="left"
          style="max-width: 800px"
        >
          <el-form-item label="Название компании" prop="name">
            <el-input v-model="insuranceCompany.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import InsuranceCompany from '@/classes/insuranceCompanies/InsuranceCompany';
import InsuranceCompanyRules from '@/classes/insuranceCompanies/InsuranceCompanyRules';
import PageHead from '@/components/PageHead.vue';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'InsuranceCompanyPage',
  components: {
    PageHead,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const form = ref();
    const isEditMode: Ref<boolean> = ref(false);
    const mount: Ref<boolean> = ref(false);
    const rules = InsuranceCompanyRules;
    const title: Ref<string> = ref('');

    const insuranceCompany: ComputedRef<IInsuranceCompany> = computed(() => store.getters['insuranceCompanies/insuranceCompany']);

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { validate } = useValidate();
    const { submitHandling } = useForm(isEditMode.value);

    onBeforeMount(async (): Promise<void> => {
      if (!route.params.insuranceCompanyId) {
        isEditMode.value = false;
        store.commit('insuranceCompanies/set', new InsuranceCompany());
        title.value = 'Создать компанию';
      } else {
        isEditMode.value = true;
        title.value = 'Редактировать компанию';
        await store.dispatch('insuranceCompanies/get', route.params.insuranceCompanyId);
      }

      pushToLinks(['/insurance-companies'], ['Страховые компании']);
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(insuranceCompany, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;

      if (!validate(form)) {
        return;
      }

      await submitHandling('insuranceCompanies', insuranceCompany.value, next, 'insurance-companies');
    };

    return {
      form,
      insuranceCompany,
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
