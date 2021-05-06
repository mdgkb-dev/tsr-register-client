import IPatient from '../../interfaces/patients/IPatient';
import HttpClient from '@/services/HttpClient';

const httpClient = new HttpClient('patient/');

export default {
  namespaced: true,
  state: {
    patients: [],
  },
  getters: {
    getPatientsNames: (state: any) => {
      return state.patients;
    },
    patients: (state: any): IPatient[] => {
      return state.patients;
    },
    getById: (state: any) => {
      return (id: number): IPatient => {
        return state.patients.find((human: any) => human.id === id);
      };
    },
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.patients = payload;
    },
    create: (state: any, payload: any) => {
      state.patients.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.patients.find((item: any) => item.id === payload.recordId);
      Object.assign(item, payload);
    },
    delete: (state: any, payload: any) => {
      const i = state.patients.findIndex((item: any) => item.id == payload);
      state.patients.splice(i, 1);
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
    delete: async (context: any, payload: any) => {
      context.commit('delete', await httpClient.delete(payload.id));
    },
  },
};
