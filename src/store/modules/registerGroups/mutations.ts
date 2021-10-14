import { MutationTree } from 'vuex';

import RegisterGroup from '@/classes/registers/RegisterGroup';
import RegisterPropertyToRegisterGroup from '@/classes/registers/RegisterPropertyToRegisterGroup';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterPropertyToRegisterGroup from '@/interfaces/registers/IRegisterPropertyToRegisterGroup';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, registerGroups: IRegisterGroup[]) {
    state.registerGroups = registerGroups?.map((a: IRegisterGroup) => new RegisterGroup(a));
  },
  set(state, registerGroup: IRegisterGroup) {
    state.registerGroup = new RegisterGroup(registerGroup);
  },
  create(state, payload: IRegisterGroup) {
    state.registerGroups.push(new RegisterGroup(payload));
  },
  update(state, payload: IRegisterGroup) {
    const item = state.registerGroups.find((i: IRegisterGroup) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.registerGroups.findIndex((item: IRegisterGroup) => item.id === id);
    state.registerGroups.splice(i, 1);
  },
  addProperty(state) {
    state.registerGroup.registerPropertyToRegisterGroup.push(new RegisterPropertyToRegisterGroup());
  },
  removeProperty(state, item: IRegisterPropertyToRegisterGroup) {
    const index = state.registerGroup.registerPropertyToRegisterGroup.indexOf(item);
    if (index !== -1) {
      state.registerGroup.registerPropertyToRegisterGroup.splice(index, 1);
      if (item.id) state.registerGroup.registerPropertyToRegisterGroupForDelete.push(item.id);
    }
  },
};

export default mutations;
