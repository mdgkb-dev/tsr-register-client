import { ActionTree } from 'vuex';

import DrugForm from '@/classes/DrugForm';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DrugForm, State>('drug-forms'),
};

export default actions;
