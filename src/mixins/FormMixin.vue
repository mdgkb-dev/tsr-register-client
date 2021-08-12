<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { NavigationGuardNext } from 'vue-router';

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IPatient from '@/interfaces/patients/IPatient';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRepresentative from '@/interfaces/representatives/IRepresentative';

@Options({
  name: 'FormMixin',
})
export default class FormMixin extends Vue {
  isEditMode!: boolean;
  $message!: any;
  title = '';

  async submitHandling(
    store: string,
    payload:
      | IPatient
      | IRepresentative
      | IAnthropometry
      | IRegisterProperty
      | IDocumentType
      | IRegister
      | IRegisterGroup
      | IInsuranceCompany,
    next?: NavigationGuardNext,
    path?: string
  ): Promise<void> {
    try {
      if (this.isEditMode) {
        await this.$store.dispatch(`${store}/edit`, payload);
      } else {
        await this.$store.dispatch(`${store}/create`, payload);
      }
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }
    if (next) {
      next();
    } else {
      await this.$router.push(`/${path ?? store}`);
    }
  }

  syncSubmitHandling(
    store: string,
    payload:
      | IPatient
      | IRepresentative
      | IAnthropometry
      | IRegisterProperty
      | IDocumentType
      | IRegister
      | IRegisterGroup
      | IInsuranceCompany,
    path?: string
  ): void {
    try {
      if (this.isEditMode) {
        this.$store.dispatch(`${store}/edit`, payload);
      } else {
        this.$store.dispatch(`${store}/create`, payload);
      }
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }

    this.$router.push(`/${path ?? store}`);
  }
}
</script>
