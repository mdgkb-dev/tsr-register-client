<template>
  <el-form ref="form" :model="insuranceCompany" @submit.prevent="submitForm" :rules="rules">
    <el-form-item label="Название компании" label-width="20vw" prop="name">
      <el-input v-model="insuranceCompany.name"></el-input>
    </el-form-item>

    <div class="center-align">
      <el-button type="primary" native-type="submit">Сохранить</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import { mapActions, mapGetters } from 'vuex';
import InsuranceCompany from '@/classes/insuranceCompanies/InsuranceCompany';

@Options({
  computed: {
    ...mapGetters('insuranceCompanies', ['insuranceCompanies']),
  },
  methods: {
    ...mapActions({
      insuranceCompanyGet: 'insuranceCompanies/get',
    }),
  },
})
export default class InsuranceCompanyPage extends Vue {
  $refs!: {
    form: any;
  };

  insuranceCompanyGet!: (insuranceCompanyId: string) => Promise<void>;

  isEditMode!: boolean;
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
    let validationResult = true;

    this.$refs.form.validate((valid: boolean) => {
      if (!valid) {
        validationResult = false;
        return false;
      }
      return true;
    });

    if (!validationResult) {
      return;
    }

    if (this.isEditMode) {
      this.$store.dispatch('insuranceCompanies/edit', this.insuranceCompany);
    } else {
      this.$store.dispatch('insuranceCompanies/create', this.insuranceCompany);
    }

    this.$router.push('/insurance-companies');
  }
}
</script>
