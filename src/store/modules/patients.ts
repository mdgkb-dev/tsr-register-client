import HttpClient from '@/services/HttpClient';
import IPatient from '../../interfaces/patients/IPatient';

const httpClient = new HttpClient('patient');

export default {
  namespaced: true,
  state: {
    patients: [],
  },
  getters: {
    getPatientsNames: (state: any) => state.patients,
    patients: (state: any): IPatient[] => state.patients,
    getById: (state: any) => (id: number): IPatient => state.patients.find((human: any) => human.id === id),
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.patients = payload;
    },
    create: (state: any, payload: any) => {
      state.patients.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.patients.find((i: any) => i.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    },
    delete: (state: any, payload: any) => {
      const i = state.patients.findIndex((item: any) => item.id === payload);
      state.patients.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      context.commit('set', await httpClient.get());
    },
    create: async (context: any, payload: any): Promise<void> => {
      context.commit('create', await httpClient.post(payload));
    },
    edit: async (context: any, payload: any): Promise<void> => {
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string): Promise<void> => {
      context.commit('delete', await httpClient.delete(id));
    },
  },
};
