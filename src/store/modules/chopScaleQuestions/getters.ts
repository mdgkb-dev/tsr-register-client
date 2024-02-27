import { GetterTree } from 'vuex';

import ChopScaleQuestion from '@/classes/ChopScaleQuestion';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<ChopScaleQuestion, State>(),
};

export default getters;
