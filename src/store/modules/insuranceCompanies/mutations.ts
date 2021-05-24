import { MutationTree } from 'vuex';
import { State } from './state';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import InsuranceCompany from '@/classes/insuranceCompanies/InsuranceCompany';

const mutations: MutationTree<State> = {
  setAll(state, insuranceCompanies: IInsuranceCompany[]) {
    state.insuranceCompanies = insuranceCompanies.map((i: IInsuranceCompany) => new InsuranceCompany(i));
  },
  set(state, insuranceCompany: any) {
    state.insuranceCompany = new InsuranceCompany(insuranceCompany);
  },
  create(state, insuranceCompany: InsuranceCompany) {
    if (state.insuranceCompanies) {
      state.insuranceCompanies.push(new InsuranceCompany(insuranceCompany));
    }
  },
  update(state: any, payload: any) {
    const insuranceCompany = state.insuranceCompanies.find((company: any) => company.id === payload.id);
    if (insuranceCompany) {
      Object.assign(insuranceCompany, payload);
    }
  },
  delete(state: any, payload: any) {
    const i = state.insuranceCompanies.findIndex((insuranceCompany: any) => insuranceCompany.id === payload);
    state.insuranceCompanies.splice(i, 1);
  },
};

export default mutations;
