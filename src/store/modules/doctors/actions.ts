import { ActionTree } from 'vuex';

import Doctor from '@/classes/Doctor';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Doctor, State>('doctors'),
};

export default actions;
