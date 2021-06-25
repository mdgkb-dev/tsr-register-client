import { MutationTree } from 'vuex';

import Anthropometry from '@/classes/anthropometry/Anthropometry';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, anthropometries: IAnthropometry[]) {
    state.anthropometries = anthropometries.map((a: IAnthropometry) => new Anthropometry(a));
  },
  set(state: any, anthropometry: IAnthropometry) {
    state.anthropometry = new Anthropometry(anthropometry);
  },
  create(state: any, payload: IAnthropometry) {
    state.anthropometries.push(new Anthropometry(payload));
  },
  update(state: any, payload: IAnthropometry) {
    const item = state.anthropometries.find((i: any) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.anthropometries.findIndex((item: IAnthropometry) => item.id === id);
    state.anthropometries.splice(i, 1);
  },
};

export default mutations;
