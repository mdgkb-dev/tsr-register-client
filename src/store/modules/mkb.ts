import HttpClient from '@/services/HttpClient';
import IPatient from '../../interfaces/patients/IPatient';

const httpClient = new HttpClient('mkb');

export default {
  namespaced: true,
  state: {
    mkb: [],
  },
  getters: {
    mkb: (state: any) => state.mkb,
    patients: (state: any): IPatient[] => state.mkb,
    getById: (state: any) => (id: number): IPatient => state.mkb.find((diagnosis: any) => diagnosis.id === id),
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.mkb = payload;
    },
    create: (state: any, payload: any) => {
      state.mkb.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.mkb.find((i: any) => i.id === payload.id);

      Object.assign(item, payload);
    },
    delete: (state: any, payload: any) => {
      const i = state.mkb.findIndex((item: any) => item.id === payload);
      state.mkb.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      context.commit('set', await httpClient.get());
    },
    create: async (context: any, payload: any): Promise<void> => {
      context.commit('create', await httpClient.post({ payload }));
    },
    edit: async (context: any, payload: any): Promise<void> => {
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string): Promise<void> => {
      context.commit('delete', await httpClient.delete(id));
    },
  },
};
