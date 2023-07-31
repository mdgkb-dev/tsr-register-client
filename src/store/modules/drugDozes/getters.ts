import { GetterTree } from 'vuex';

import DrugDoze from '@/classes/DrugDoze';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DrugDoze, State>(),
};

export default getters;
