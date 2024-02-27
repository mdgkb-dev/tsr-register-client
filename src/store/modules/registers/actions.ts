import { ActionTree } from 'vuex';

import Register from '@/classes/Register';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Register, State>('registers'),
};

export default actions;
