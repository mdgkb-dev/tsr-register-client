import { ActionTree } from 'vuex';

import DrugDecrease from '@/classes/DrugDecrease';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DrugDecrease, State>('drug-decreases'),
};

export default actions;
