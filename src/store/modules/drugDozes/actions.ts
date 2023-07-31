import { ActionTree } from 'vuex';

import DrugDoze from '@/classes/DrugDoze';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DrugDoze, State>('drug-dozes'),
};

export default actions;
