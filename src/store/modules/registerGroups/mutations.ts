import { MutationTree } from 'vuex';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import RegisterGroup from '@/classes/registers/RegisterGroup';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, registerGroups: IRegisterGroup[]) {
    state.registerGroups = registerGroups.map((a: IRegisterGroup) => new RegisterGroup(a));
  },
  set(state: any, registerGroup: IRegisterGroup) {
    state.registerGroup = new RegisterGroup(registerGroup);
  },
  create(state: any, payload: IRegisterGroup) {
    state.registerGroups.push(new RegisterGroup(payload));
  },
  update(state: any, payload: IRegisterGroup) {
    const item = state.registerGroups.find((i: IRegisterGroup) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    if (state.registerGroups) {
      console.log(id);
      const i = state.registerGroups.findIndex((item: IRegisterGroup) => item.id === id);
      console.log(state.registerGroups);
      console.log(i);
      state.registerGroups.splice(i, 1);
    }
  },
};

export default mutations;
