import { ActionTree } from 'vuex';

import Disability from '@/classes/Disability';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Disability, State>('disabilities'),
};

export default actions;
