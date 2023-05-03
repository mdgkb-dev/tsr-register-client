import { ActionTree } from 'vuex';

import Anamnesis from '@/classes/Anamnesis';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Anamnesis, State>('anamneses'),
};

export default actions;
