import { GetterTree } from 'vuex';

import IRegisterQuery from '@/interfaces/IRegisterQuery';
import IRegisterQueryToRegisterProperty from '@/interfaces/IRegisterQueryToRegisterProperty';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  registerQueries(state): IRegisterQuery[] | undefined {
    const { registerQueries } = state;
    return registerQueries;
  },
  registerQuery(state): IRegisterQuery | undefined {
    const { registerQuery } = state;
    return registerQuery;
  },
  getById(state, id: string): IRegisterQuery | undefined {
    const { registerQueries } = state;
    return registerQueries ? registerQueries.find((item: IRegisterQuery) => item.id === id) : undefined;
  },
  registerQueryToRegisterProperty(state): IRegisterQueryToRegisterProperty[] {
    return state.registerQuery.registerQueryToRegisterProperty;
  },
  isAddPropertyDisabled(state): boolean {
    return state.isAddPropertyDisabled;
  },
};

export default getters;
