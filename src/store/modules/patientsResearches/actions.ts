import { ActionTree } from 'vuex';

import PatientResearch from '@/classes/PatientResearch';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<PatientResearch, State>('patients-researches'),
};

export default actions;
