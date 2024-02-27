import { GetterTree } from 'vuex';

import FileInfo from '@/classes/files/FileInfo';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<FileInfo, State>(),
};

export default getters;
