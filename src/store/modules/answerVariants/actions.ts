import { ActionTree } from 'vuex';

import AnswerVariant from '@/classes/AnswerVariant';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<AnswerVariant, State>('answer-variants'),
};

export default actions;
