import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { State } from './state';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

const getters: GetterTree<State, RootState> = {
  insuranceCompanies(state): IInsuranceCompany[] | undefined {
    return state.insuranceCompanies;
  },
  insuranceCompany(state): IInsuranceCompany | undefined {
    return state.insuranceCompany;
  },
  getById(state, id: number): IInsuranceCompany | undefined {
    return state.insuranceCompanies ? state.insuranceCompanies.find((item: any) => item.id === id) : undefined;
  },
};

export default getters;
