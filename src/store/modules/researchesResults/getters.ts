import { GetterTree } from 'vuex';

import ResearchResult from '@/classes/ResearchResult';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<ResearchResult, State>(),
};

export default getters;
