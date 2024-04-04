import { GetterTree } from 'vuex';

import AnswerVariant from '@/classes/AnswerVariant';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<AnswerVariant, State>(),
};

export default getters;
