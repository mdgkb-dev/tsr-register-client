import { ActionTree } from 'vuex';

import Drug from '@/classes/Drug';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Drug, State>('drugs'),
};

export default actions;
