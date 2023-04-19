import { ActionTree } from 'vuex';

import PatientResearchesPool from '@/classes/PatientResearchesPool';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<PatientResearchesPool, State>('patients-researches-pools'),
};

export default actions;
