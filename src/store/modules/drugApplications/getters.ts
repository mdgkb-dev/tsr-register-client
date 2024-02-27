import { GetterTree } from 'vuex';

import DrugApplication from '@/classes/DrugApplication';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DrugApplication, State>(),
};

export default getters;
