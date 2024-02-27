import { GetterTree } from 'vuex';

import Anamnesis from '@/classes/Anamnesis';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Anamnesis, State>(),
};

export default getters;
