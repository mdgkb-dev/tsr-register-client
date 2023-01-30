import { ActionTree } from 'vuex';

import HmfseScaleQuestion from '@/classes/HmfseScaleQuestion';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './state';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<HmfseScaleQuestion, State>('hmfse-scale-question'),
};

export default actions;
