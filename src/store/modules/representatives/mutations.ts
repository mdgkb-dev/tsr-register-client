import { MutationTree } from 'vuex';

import Representative from '@/classes/representatives/Representative';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, representatives: IRepresentative[]) {
    state.representatives = representatives.map((r: IRepresentative) => new Representative(r));
  },
  set(state, representative: IRepresentative) {
    state.representative = new Representative(representative);
  },
  create(state, payload: IRepresentative) {
    state.representatives.push(new Representative(payload));
  },
  update(state, payload: IRepresentative) {
    const item = state.representatives.find((i: IRepresentative) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.representatives.findIndex((item: IRepresentative) => item.id === id);
    state.representatives.splice(i, 1);
  },
  addPatient(state) {
    state.representative.representativeToPatient.push(new RepresentativeToPatient());
  },
  removePatient(state, item: IRepresentativeToPatient) {
    const index = state.representative.representativeToPatient.indexOf(item);
    if (index !== -1) state.representative.representativeToPatient.splice(index, 1);
  },
};

export default mutations;
