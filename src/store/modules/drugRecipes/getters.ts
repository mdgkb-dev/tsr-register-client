import { GetterTree } from 'vuex';

import DrugRecipe from '@/classes/DrugRecipe';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DrugRecipe, State>(),
};

export default getters;
