import { ActionTree } from 'vuex';

import CustomSection from '@/services/classes/page/CustomSection';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<CustomSection, State>('custom-sections'),
};

export default actions;
