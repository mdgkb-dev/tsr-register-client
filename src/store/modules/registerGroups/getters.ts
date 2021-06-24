import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
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
};

export default getters;
