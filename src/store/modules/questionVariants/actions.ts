import { ActionTree } from 'vuex';

import QuestionVariant from '@/classes/QuestionVariant';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<QuestionVariant, State>('question-variants'),
};

export default actions;
