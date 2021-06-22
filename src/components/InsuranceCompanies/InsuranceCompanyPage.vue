<template>
  <PageHead :titleParent="'Страховые компании'" :title="title" :link="'/insurance-companies'" @submitForm="submitForm" />
  <el-row>
    <div class="table-background" style="width: 100%; margin-bottom: 20px">
      <el-form ref="form" :model="insuranceCompany" :rules="rules" label-width="180px" label-position="left" style="max-width: 800px">
        <el-form-item label="Название компании" prop="name">
          <el-input v-model="insuranceCompany.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import PageHead from '@/components/PageHead.vue';

import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import InsuranceCompany from '@/classes/insuranceCompanies/InsuranceCompany';
import ValidateMixin from '@/mixins/ValidateMixin.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';

@Options({
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
export default class InsuranceCompanyPage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin) {
  insuranceCompanyGet!: (insuranceCompanyId: string) => Promise<void>;

  insuranceCompany: IInsuranceCompany = new InsuranceCompany();
  title = '';

  rules = {
    name: [
      {
        required: true,
        message: 'Пожалуйста, введите название компании',
        trigger: 'blur',
      },
    ],
  };

  async created(): Promise<void> {
    if (!this.$route.params.insuranceCompanyId) {
      this.isEditMode = false;
      this.title = 'Создать компанию';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать компанию';
      await this.insuranceCompanyGet(`${this.$route.params.insuranceCompanyId}`);
      this.insuranceCompany = this.$store.getters['insuranceCompanies/insuranceCompany'];
    }
  }

  submitForm(): void {
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
