import { GetterTree } from 'vuex';

import DrugArrive from '@/classes/DrugArrive';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DrugArrive, State>(),
};

export default getters;
