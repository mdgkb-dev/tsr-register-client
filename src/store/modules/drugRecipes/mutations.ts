import { MutationTree } from 'vuex';

import DrugRecipe from '@/classes/DrugRecipe';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DrugRecipe, State>(DrugRecipe),
};

export default mutations;
