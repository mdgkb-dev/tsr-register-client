import { MutationTree } from 'vuex';
import { State } from './state';
import IFileAnchor from '@/interfaces/files/IFileAnchor';

const mutations: MutationTree<State> = {
  writeFileAnchor(state, fileAnchor: IFileAnchor) {
    state.fileAnchor = fileAnchor;
  },
};

export default mutations;
