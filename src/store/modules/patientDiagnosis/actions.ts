import { ActionTree } from 'vuex';

import PatientDiagnosis from '@/classes/PatientDiagnosis';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<PatientDiagnosis, State>('patient-diagnosis'),
};

export default actions;
