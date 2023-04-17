import { ActionTree } from 'vuex';

import Patient from '@/classes/Patient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';
const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Patient, State>('patients'),
};

export default actions;
