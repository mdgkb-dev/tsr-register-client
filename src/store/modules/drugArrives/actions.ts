import { ActionTree } from 'vuex';

import DrugArrive from '@/classes/DrugArrive';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DrugArrive, State>('drug-arrives'),
};

export default actions;
