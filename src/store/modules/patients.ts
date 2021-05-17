import HttpClient from '@/services/HttpClient';
import Patient from '@/classes/patients/Patient';
import IPatient from '../../interfaces/patients/IPatient';

const httpClient = new HttpClient('patients');

export default {
  namespaced: true,
  state: {
    patients: [],
    patient: {},
  },
  getters: {
    patients: (state: any): IPatient[] => state.patients,
    patient: (state: any) => state.patient,
    getById: (state: any) => (id: string): IPatient => state.patients.find((patient: IPatient) => patient.id === id),
    getPatientsNames: (state: any) => state.patients,
  },
  mutations: {
    setAll: (state: any, patients: IPatient[]) => {
      state.patients = patients.map((p: IPatient) => new Patient(p));
    },
    set: (state: any, patient: IPatient) => {
      state.patient = new Patient(patient);
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
      context.commit('setAll', await httpClient.get());
    },
    get: async (context: any, patientId: string) => {
      context.commit('set', await httpClient.get(patientId));
    },
    create: async (context: any, payload: IPatient): Promise<void> => {
      console.log('create');
      context.commit('create', await httpClient.post(payload));
    },
    edit: async (context: any, payload: IPatient): Promise<void> => {
      console.log('edit');
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string): Promise<void> => {
      context.commit('delete', await httpClient.delete(id));
    },
  },
};
