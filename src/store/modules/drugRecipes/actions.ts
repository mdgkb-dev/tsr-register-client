import { ActionTree } from 'vuex';

import DrugRecipe from '@/classes/DrugRecipe';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DrugRecipe, State>('drug-recipes'),
};

export default actions;
