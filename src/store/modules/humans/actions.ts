import { ActionTree } from 'vuex';

import Human from '@/classes/Human';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Human, State>('humans'),
};

export default actions;
