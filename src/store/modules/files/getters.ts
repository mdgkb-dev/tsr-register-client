import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import IFileAnchor from '@/interfaces/files/IFileAnchor';
import { State } from './state';

const getters: GetterTree<State, RootState> = {
  fileAnchor(state): IFileAnchor | undefined {
    return state.fileAnchor;
  },
};

export default getters;
