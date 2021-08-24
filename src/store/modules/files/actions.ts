import { ActionTree } from 'vuex';

import IFileAnchor from '@/interfaces/files/IFileAnchor';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('files-info');

const actions: ActionTree<State, RootState> = {
  generateLink: async ({ commit }, fileId: string): Promise<void> => {
    const fileAnchor: IFileAnchor = await httpClient.get({ query: fileId, isBlob: true });
    console.log(fileAnchor);
    commit('writeFileAnchor', fileAnchor);
  },
};

export default actions;
