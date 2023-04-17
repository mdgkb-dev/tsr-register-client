<template>
  <div v-if="mount">
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
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import InsuranceCompany from '@/classes/insuranceCompanies/InsuranceCompany';
import InsuranceCompanyRules from '@/classes/insuranceCompanies/InsuranceCompanyRules';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

export default defineComponent({
  name: 'InsuranceCompanyPage',
  setup() {
    const store = useStore();
    const route = useRoute();

    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.insuranceCompanyId);
    const mount: Ref<boolean> = ref(false);
    const rules = InsuranceCompanyRules;

    const insuranceCompany: ComputedRef<IInsuranceCompany> = computed(() => store.getters['insuranceCompanies/insuranceCompany']);

    // const { links, pushToLinks } = useBreadCrumbsLinks();
    // const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    // const { validate } = useValidate();
    // const { submitHandling } = useForm(isEditMode.value);
    //
    onBeforeMount(async (): Promise<void> => {
      let title: string;
      if (!route.params.insuranceCompanyId) {
        store.commit('insuranceCompanies/set', new InsuranceCompany());
        title = 'Создать компанию';
      } else {
        title = 'Редактировать компанию';
        await store.dispatch('insuranceCompanies/get', route.params.insuranceCompanyId);
      }

      // pushToLinks(['/insurance-companies'], ['Страховые компании']);
      // store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      store.commit('main/setActiveMenu', 'InsuranceCompanies');
      mount.value = true;

      // window.addEventListener('beforeunload', beforeWindowUnload);
      // watch(insuranceCompany, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      // showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext) => {
      // saveButtonClick.value = true;
      // if (!validate(form.value)) {
      //   return;
      // }
      // await submitHandling('insuranceCompanies', insuranceCompany.value, next, 'insurance-companies');
    };

    return {
      form,
      insuranceCompany,
      // links,
      mount,
      rules,
      submitForm,
    };
  },
});
</script>
