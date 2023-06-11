import { ActionTree } from 'vuex';

import PatientRegister from '@/classes/PatientRegister';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<PatientRegister, State>('patients-registers'),
};

export default actions;