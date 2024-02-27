import { ActionTree } from 'vuex';

import Question from '@/classes/Question';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Question, State>('questions'),
};

export default actions;
