import { GetterTree } from 'vuex';

import Representative from '@/classes/Representative';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Representative, State>(),
  lastInsertedId(state): string | undefined {
    return state.lastInsertedId;
  },
};

export default getters;
