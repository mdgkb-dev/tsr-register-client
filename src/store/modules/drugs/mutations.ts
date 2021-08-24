import { MutationTree } from 'vuex';

import Drug from '@/classes/drugs/Drug';
import IDrug from '@/interfaces/drugs/IDrug';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, drugs: IDrug[]) {
    state.drugs = drugs.map((i: IDrug) => new Drug(i));
  },
  set(state, drug: IDrug) {
    state.drug = new Drug(drug);
  },
  create(state, payload: IDrug) {
    state.drugs.push(new Drug(payload));
  },
  update(state, payload: IDrug) {
    const item = state.drugs.find((i: IDrug) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.drugs.findIndex((item: IDrug) => item.id === id);
    state.drugs.splice(i, 1);
  },
};

export default mutations;
