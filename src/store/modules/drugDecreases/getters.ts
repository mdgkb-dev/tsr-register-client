import { GetterTree } from 'vuex';

import DrugDecrease from '@/classes/DrugDecrease';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DrugDecrease, State>(),
};

export default getters;
