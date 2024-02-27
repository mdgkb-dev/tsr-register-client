import { ActionTree } from 'vuex';

import CommissionDrugApplication from '@/classes/CommissionDrugApplication';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<CommissionDrugApplication, State>('commissions-drug-applications'),
};

export default actions;
