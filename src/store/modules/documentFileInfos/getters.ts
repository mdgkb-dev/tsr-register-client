import { GetterTree } from 'vuex';

import DocumentFileInfo from '@/classes/DocumentFileInfo';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DocumentFileInfo, State>(),
};

export default getters;
