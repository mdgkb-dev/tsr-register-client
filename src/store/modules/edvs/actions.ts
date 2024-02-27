import { ActionTree } from 'vuex';

import Edv from '@/classes/Edv';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Edv, State>('edvs'),
};

export default actions;
