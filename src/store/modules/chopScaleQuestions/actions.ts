import { ActionTree } from 'vuex';

import ChopScaleQuestion from '@/classes/ChopScaleQuestion';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './state';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<ChopScaleQuestion, State>('chop-scale-questions'),
};

export default actions;
