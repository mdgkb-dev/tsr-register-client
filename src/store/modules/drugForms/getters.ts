import { GetterTree } from 'vuex';

import DrugForm from '@/classes/DrugForm';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DrugForm, State>(),
};

export default getters;
