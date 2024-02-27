import { GetterTree } from 'vuex';

import HmfseScaleQuestion from '@/classes/HmfseScaleQuestion';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<HmfseScaleQuestion, State>(),
};

export default getters;
