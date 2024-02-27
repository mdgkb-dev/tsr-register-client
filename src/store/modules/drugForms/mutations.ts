import { MutationTree } from 'vuex';

import DrugForm from '@/classes/DrugForm';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DrugForm, State>(DrugForm),
};

export default mutations;
