import HttpClient from '@/services/HttpClient';
import Patient from '@/classes/patients/Patient';
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
    getById: (state: any) => (id: string): IPatient => state.patients.find((patient: IPatient) => patient.id === id),
  },
  mutations: {
    set: (state: any, payload: IPatient[]) => {
      state.patients = payload.map((p: IPatient) => new Patient(p));
    },
    create: (state: any, payload: IPatient) => {
      state.patients.push(new Patient(payload));
    },
    update: (state: any, payload: IPatient) => {
      const item = state.patients.find((i: any) => i.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    },
    delete: (state: any, id: string) => {
      const i = state.patients.findIndex((item: any) => item.id === id);
      state.patients.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      context.commit('set', await httpClient.get());
    },
    create: async (context: any, payload: IPatient): Promise<void> => {
      context.commit('create', await httpClient.post(payload));
    },
    edit: async (context: any, payload: IPatient): Promise<void> => {
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string): Promise<void> => {
      context.commit('delete', await httpClient.delete(id));
    },
  },
};
