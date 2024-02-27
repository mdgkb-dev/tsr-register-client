import { GetterTree } from 'vuex';

import Document from '@/classes/Document';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Document, State>(),
};

export default getters;
