import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { State } from './state';
import IFileAnchor from '@/interfaces/files/IFileAnchor';

const getters: GetterTree<State, RootState> = {
  fileAnchor(state): IFileAnchor | undefined {
    return state.fileAnchor;
  },
};

export default getters;
