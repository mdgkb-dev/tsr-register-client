import { MutationTree } from 'vuex';
import { State } from './state';
import IPatient from '@/interfaces/patients/IPatient';
import Patient from '@/classes/patients/Patient';

const mutations: MutationTree<State> = {
  setAll(state, patients: IPatient[]) {
    state.patients = patients.map((p: IPatient) => new Patient(p));
  },
  set(state, patient: IPatient) {
    state.patient = new Patient(patient);
  },
  create(state, payload: IPatient) {
    state.patients.push(new Patient(payload));
  },
  update(state, payload: IPatient) {
    const item = state.patients.find((i: any) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.patients.findIndex((item: any) => item.id === id);
    state.patients.splice(i, 1);
  },
};

export default mutations;
