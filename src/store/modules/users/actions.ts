import { ActionTree } from 'vuex';

import User from '@/classes/User';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<User, State>('users'),
};

export default actions;
