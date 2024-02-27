import { GetterTree } from 'vuex';

import CustomSection from '@/services/classes/page/CustomSection';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<CustomSection, State>(),
};

export default getters;
