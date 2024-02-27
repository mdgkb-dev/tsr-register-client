import { ActionTree } from 'vuex';

import RepresentativeType from '@/classes/RepresentativeType';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<RepresentativeType, State>('representative-types'),
};

export default actions;
