import { GetterTree } from 'vuex';

import IFileAnchor from '@/interfaces/files/IFileAnchor';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  fileAnchor(state): IFileAnchor | undefined {
    return state.fileAnchor;
  },
};

export default getters;
