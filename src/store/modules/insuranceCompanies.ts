import HttpClient from '@/services/HttpClient';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import InsuranceCompany from '@/classes/insuranceCompanies/InsuranceCompany';

const httpClient = new HttpClient('insurance-companies');

export default {
  namespaced: true,
  state: {
    insuranceCompanies: [],
    insuranceCompany: {},
  },
  getters: {
    insuranceCompanies: (state: any) => state.insuranceCompanies,
    insuranceCompany: (state: any) => state.insuranceCompany,
    getById: (state: any) => (id: number) => state.insuranceCompanies.find((insuranceCompany: any) => insuranceCompany.id === id),
  },
  mutations: {
    setAll: (state: any, insuranceCompanies: IInsuranceCompany[]) => {
      state.insuranceCompanies = insuranceCompanies.map((i: IInsuranceCompany) => new InsuranceCompany(i));
    },
    set: (state: any, insuranceCompany: any) => {
      state.insuranceCompany = new InsuranceCompany(insuranceCompany);
    },
    create: (state: any, insuranceCompany: InsuranceCompany) => {
      state.insuranceCompanies.push(new InsuranceCompany(insuranceCompany));
    },
    update: (state: any, payload: any) => {
      const insuranceCompany = state.insuranceCompanies.find((company: any) => company.id === payload.id);
      if (insuranceCompany) {
        Object.assign(insuranceCompany, payload);
      }
    },
    delete: (state: any, payload: any) => {
      const i = state.insuranceCompanies.findIndex((insuranceCompany: any) => insuranceCompany.id === payload);
      state.insuranceCompanies.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      context.commit('setAll', await httpClient.get());
    },
    get: async (context: any, insuranceCompanyId: string): Promise<void> => {
      context.commit('set', await httpClient.get(insuranceCompanyId));
    },
    create: async (context: any, payload: IInsuranceCompany): Promise<void> => {
      context.commit('create', await httpClient.post(payload));
    },
    edit: async (context: any, payload: IInsuranceCompany): Promise<void> => {
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string): Promise<void> => {
      context.commit('delete', await httpClient.delete(id));
    },
  },
};
