import HttpClient from '@/services/HttpClient';

const httpClient = new HttpClient('insurance-company');

export default {
  namespaced: true,
  state: {
    insuranceCompanies: [],
  },
  getters: {
    insuranceCompanies: (state: any) => {
      return state.insuranceCompanies;
    },
    getById: (state: any) => (id: number) => {
      return state.insuranceCompanies.find((insuranceCompany: any) => insuranceCompany.id === id);
    },
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.insuranceCompanies = payload;
    },
    create: (state: any, payload: any) => {
      state.insuranceCompanies.push(payload);
    },
    update: (state: any, payload: any) => {
      const insuranceCompany = state.insuranceCompanies.find(
        (insuranceCompany: any) => insuranceCompany.id === payload.id
      );
      if (insuranceCompany) {
        Object.assign(insuranceCompany, payload);
      }
    },
    delete: (state: any, payload: any) => {
      const i = state.insuranceCompanies.findIndex(
        (insuranceCompany: any) => insuranceCompany.id == payload
      );
      state.insuranceCompanies.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any) => {
      context.commit('set', await httpClient.get());
    },
    create: async (context: any, payload: any) => {
      context.commit('create', await httpClient.post(payload));
    },
    edit: async (context: any, payload: any) => {
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string) => {
      context.commit('delete', await httpClient.delete(id));
    },
  },
};
