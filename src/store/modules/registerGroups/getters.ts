import { GetterTree } from 'vuex';

import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterPropertyToRegisterGroup from '@/interfaces/registers/IRegisterPropertyToRegisterGroup';
import { RootState } from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  registerGroups(state): IRegisterGroup[] | undefined {
    const { registerGroups } = state;
    return registerGroups;
  },
  registerGroup(state): IRegisterGroup | undefined {
    const { registerGroup } = state;
    return registerGroup;
  },
  getById(state, id: string): IRegisterGroup | undefined {
    const { registerGroups } = state;
    return registerGroups ? registerGroups.find((item: IRegisterGroup) => item.id === id) : undefined;
  },
  registerPropertyToRegisterGroup(state): IRegisterPropertyToRegisterGroup[] {
    return state.registerGroup.registerPropertyToRegisterGroup;
  },
};

export default getters;
