import { MutationTree } from 'vuex';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import Representative from '@/classes/representatives/Representative';
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
};

export default mutations;
