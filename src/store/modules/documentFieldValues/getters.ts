import { GetterTree } from 'vuex';

import DocumentFieldValue from '@/classes/DocumentFieldValue';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DocumentFieldValue, State>(),
};

export default getters;
