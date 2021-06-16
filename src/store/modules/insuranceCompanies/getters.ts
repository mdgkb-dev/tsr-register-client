import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import { State } from './state';

const getters: GetterTree<State, RootState> = {
  insuranceCompanies(state): IInsuranceCompany[] | undefined {
    return state.insuranceCompanies;
  },
  insuranceCompany(state): IInsuranceCompany | undefined {
    return state.insuranceCompany;
  },
  getById(state, id: string): IInsuranceCompany | undefined {
    return state.insuranceCompanies ? state.insuranceCompanies.find((item: IInsuranceCompany) => item.id === id) : undefined;
  },
};

export default getters;
