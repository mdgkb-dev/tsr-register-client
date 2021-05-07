import IPatient from '../../interfaces/patients/IPatient';

import HttpClient from '@/services/HttpClient';

const httpClient = new HttpClient('mkb');

export default {
  namespaced: true,
  state: {
    mkb: [],
  },
  getters: {
    mkb: (state: any) => {
      return state.mkb;
    },
    patients: (state: any): IPatient[] => {
      return state.mkb;
    },
    getById: (state: any) => {
      return (id: number): IPatient => {
        return state.mkb.find((diagnosis: any) => diagnosis.id === id);
      };
    },
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.mkb = payload;
    },
    create: (state: any, payload: any) => {
      state.mkb.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.mkb.find((item: any) => item.id === payload.id);

      Object.assign(item, payload);
    },
    delete: (state: any, payload: any) => {
      const i = state.mkb.findIndex((item: any) => item.id == payload);
      state.mkb.splice(i, 1);
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
