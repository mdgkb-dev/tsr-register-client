import { MutationTree } from 'vuex';

import Region from '@/classes/Region';
import IRegion from '@/interfaces/IRegion';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, Regions: IRegion[]) {
    state.items = Regions?.map((a: IRegion) => new Region(a));
  },
  set(state, item: IRegion) {
    state.item = new Region(item);
  },
  create(state, payload: IRegion) {
    state.items.push(new Region(payload));
  },
  update(state, payload: IRegion) {
    const item = state.items.find((i: IRegion) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.items.findIndex((item: IRegion) => item.id === id);
    state.items.splice(i, 1);
  },
};

export default mutations;
