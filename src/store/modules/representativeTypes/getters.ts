import { GetterTree } from 'vuex';

import RepresentativeType from '@/classes/RepresentativeType';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<RepresentativeType, State>(),
};

export default getters;
