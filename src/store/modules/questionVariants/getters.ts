import { GetterTree } from 'vuex';

import QuestionVariant from '@/classes/QuestionVariant';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<QuestionVariant, State>(),
};

export default getters;
