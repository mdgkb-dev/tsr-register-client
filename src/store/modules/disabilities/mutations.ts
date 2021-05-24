import { MutationTree } from 'vuex';
import { State } from './state';
import IDisability from '@/interfaces/disabilities/IDisability';
import Disability from '@/classes/disability/Disability';

const mutations: MutationTree<State> = {
  setAll(state, disabilities: IDisability[]) {
    state.disabilities = disabilities.map(d => new Disability(d));
  },
  set(state, disability: IDisability) {
    state.disability = new Disability(disability);
  },
  create(state, disability: IDisability) {
    state.disability = new Disability(disability);
  },
  update(state, payload: IDisability) {
    if (state.disabilities) {
      const item = state.disabilities.find((i: IDisability) => i.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    }
  },
  delete: (state: any, payload: string) => {
    const i = state.disabilities.findIndex((disabilities: any) => disabilities.id === payload);
    state.disabilities.splice(i, 1);
  },
};

export default mutations;
