import { ActionTree } from 'vuex';

import CommissionTemplate from '@/classes/CommissionTemplate';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<CommissionTemplate, State>('commissions-templates'),
};

export default actions;
