import { GetterTree } from 'vuex';

import DrugApplicationStatus from '@/classes/DrugApplicationStatus';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DrugApplicationStatus, State>(),
};

export default getters;
