import { MutationTree } from 'vuex';
import { State } from './state';
import IPatient from '@/interfaces/patients/IPatient';
import Patient from '@/classes/patients/Patient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import Representative from '@/classes/representatives/Representative';

const mutations: MutationTree<State> = {
  setAll(state, representatives: IRepresentative[]) {
    state.representatives = representatives.map((r: IRepresentative) => new Representative(r));
  },
  set(state, representative: IRepresentative) {
    state.representative = new Representative(representative);
  },
  create(state, payload: IPatient) {
    state.representatives.push(new Patient(payload));
  },
  update(state, payload: IPatient) {
    const item = state.representatives.find((i: any) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.representatives.findIndex((item: any) => item.id === id);
    state.representatives.splice(i, 1);
  },
};

export default mutations;
