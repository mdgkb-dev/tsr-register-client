import { MutationTree } from 'vuex';
import IDisability from '@/interfaces/disabilities/IDisability';
import Disability from '@/classes/disability/Disability';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, disabilities: IDisability[]) {
    state.disabilities = disabilities.map((d: IDisability) => new Disability(d));
  },
  set(state, disability: IDisability) {
    state.disability = new Disability(disability);
  },
  create(state, disability: IDisability) {
    state.disability = new Disability(disability);
  },
  update(state, payload: IDisability) {
    const item = state.disabilities.find((i: IDisability) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete: (state, payload: string) => {
    const i = state.disabilities.findIndex((disabilities: IDisability) => disabilities.id === payload);
    state.disabilities.splice(i, 1);
  },
};

export default mutations;
