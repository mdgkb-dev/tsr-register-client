import { MutationTree } from 'vuex';

import IFileAnchor from '@/interfaces/files/IFileAnchor';

import { State } from './state';

const mutations: MutationTree<State> = {
  writeFileAnchor(state, fileAnchor: IFileAnchor) {
    state.fileAnchor = fileAnchor;
  },
};

export default mutations;
