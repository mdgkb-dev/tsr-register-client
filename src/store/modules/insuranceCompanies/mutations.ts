import { MutationTree } from 'vuex';

import InsuranceCompany from '@/classes/insuranceCompanies/InsuranceCompany';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, insuranceCompanies: IInsuranceCompany[]) {
    state.insuranceCompanies = insuranceCompanies?.map((i: IInsuranceCompany) => new InsuranceCompany(i));
  },
  set(state, insuranceCompany: IInsuranceCompany) {
    state.insuranceCompany = new InsuranceCompany(insuranceCompany);
  },
  create(state, insuranceCompany: IInsuranceCompany) {
    if (state.insuranceCompanies) {
      state.insuranceCompanies.push(new InsuranceCompany(insuranceCompany));
    }
  },
  update(state, payload: IInsuranceCompany) {
    const insuranceCompany = state.insuranceCompanies.find((company: IInsuranceCompany) => company.id === payload.id);
    if (insuranceCompany) {
      Object.assign(insuranceCompany, payload);
    }
  },
  delete(state, id: string) {
    const i = state.insuranceCompanies.findIndex((insuranceCompany: IInsuranceCompany) => insuranceCompany.id === id);
    state.insuranceCompanies.splice(i, 1);
  },
};

export default mutations;
