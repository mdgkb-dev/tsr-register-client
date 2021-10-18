import { ElMessage } from 'element-plus';
import { Ref, ref } from 'vue';
import { NavigationGuardNext, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import IDocumentType from '@/interfaces/documents/IDocumentType';
import IDrug from '@/interfaces/drugs/IDrug';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IPatient from '@/interfaces/patients/IPatient';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterQuery from '@/interfaces/registers/IRegisterQuery';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

export default function (isEditMode = false): {
  syncSubmitHandling: (
    module: string,
    payload:
      | IDocumentType
      | IDrug
      | IInsuranceCompany
      | IPatient
      | IRegister
      | IRegisterGroup
      | IRegisterProperty
      | IRepresentative
      | IRepresentativeType,
    path?: string
  ) => void;
  title: Ref<string>;
  submitHandling: (
    module: string,
    payload:
      | IDocumentType
      | IDrug
      | IInsuranceCompany
      | IPatient
      | IRegister
      | IRegisterGroup
      | IRegisterProperty
      | IRegisterQuery
      | IRepresentative
      | IRepresentativeType,
    next?: NavigationGuardNext,
    path?: string
  ) => Promise<void>;
} {
  const store = useStore();
  const router = useRouter();
  const title: Ref<string> = ref('');

  const submitHandling = async (
    module: string,
    payload:
      | IDocumentType
      | IDrug
      | IInsuranceCompany
      | IPatient
      | IRegister
      | IRegisterGroup
      | IRegisterProperty
      | IRegisterQuery
      | IRepresentative
      | IRepresentativeType,
    next?: NavigationGuardNext,
    path?: string
  ): Promise<void> => {
    try {
      if (isEditMode) {
        await store.dispatch(`${module}/edit`, payload);
      } else {
        await store.dispatch(`${module}/create`, payload);
      }
    } catch (e) {
      ElMessage.error(e.toString());
      return;
    }
    if (next) {
      next();
    } else {
      await router.push(`/${path ?? module}`);
    }
  };

  const syncSubmitHandling = (
    module: string,
    payload:
      | IDocumentType
      | IDrug
      | IInsuranceCompany
      | IPatient
      | IRegister
      | IRegisterGroup
      | IRegisterProperty
      | IRepresentative
      | IRepresentativeType,
    path?: string
  ): void => {
    try {
      if (isEditMode) {
        store.dispatch(`${module}/edit`, payload);
      } else {
        store.dispatch(`${module}/create`, payload);
      }
    } catch (e) {
      ElMessage.error(e.toString());
      return;
    }

    router.push(`/${path ?? module}`);
  };

  return {
    title,
    submitHandling,
    syncSubmitHandling,
  };
}
