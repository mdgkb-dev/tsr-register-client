<template>
  <div v-if="mount">
    <PageHead :title="title" :links="links" @submitForm="submitForm" :showSaveButton="true" />
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form ref="form" :model="insuranceCompany" :rules="rules" label-width="180px" label-position="left" style="max-width: 800px">
          <el-form-item label="Название компании" prop="name">
            <el-input v-model="insuranceCompany.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import InsuranceCompany from '@/classes/insuranceCompanies/InsuranceCompany';
import PageHead from '@/components/PageHead.vue';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import ValidateMixin from '@/mixins/ValidateMixin.vue';

@Options({
  name: 'InsuranceCompanyPage',
  components: {
    PageHead,
  },
  computed: {
    ...mapGetters('insuranceCompanies', ['insuranceCompanies']),
  },
  methods: {
    ...mapActions({
      insuranceCompanyGet: 'insuranceCompanies/get',
    }),
  },
})
export default class InsuranceCompanyPage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin, BreadCrumbsLinks) {
  // Types.
  insuranceCompanyGet!: (insuranceCompanyId: string) => Promise<void>;

  // Local state.
  insuranceCompany: IInsuranceCompany = new InsuranceCompany();
  title = '';
  mount = false;

  rules = {
    name: [
      {
        required: true,
        message: 'Пожалуйста, введите название компании',
        trigger: 'blur',
      },
    ],
  };

  // Lifecycle methods.
  async mounted(): Promise<void> {
    if (!this.$route.params.insuranceCompanyId) {
      this.isEditMode = false;
      this.title = 'Создать компанию';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать компанию';
      await this.insuranceCompanyGet(`${this.$route.params.insuranceCompanyId}`);
      this.insuranceCompany = this.$store.getters['insuranceCompanies/insuranceCompany'];
    }

    this.pushToLinks(['/insurance-companies'], ['Страховые компании']);
    this.mount = true;

    window.addEventListener('beforeunload', this.beforeWindowUnload);
    this.$watch('insuranceCompany', this.formUpdated, { deep: true });
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    this.showConfirmModal(this.submitForm, next);
  }

  // Methods.
  submitForm(): void {
    this.saveButtonClick = true;
    if (!this.validate(this.$refs.form)) return;

    if (this.isEditMode) {
      this.$store.dispatch('insuranceCompanies/edit', this.insuranceCompany);
    } else {
      this.$store.dispatch('insuranceCompanies/create', this.insuranceCompany);
    }

    this.$router.push('/insurance-companies');
  }
}
</script>
