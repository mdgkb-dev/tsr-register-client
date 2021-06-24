import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import HttpClient from '@/services/HttpClient';
import IFileAnchor from '@/interfaces/files/IFileAnchor';
import { State } from './state';

const httpClient = new HttpClient('files');

const actions: ActionTree<State, RootState> = {
  generateLink: async ({ commit }, fileId: string): Promise<void> => {
    const fileAnchor: IFileAnchor = await httpClient.get({ query: fileId, isBlob: true });
    commit('writeFileAnchor', fileAnchor);
  },
};

export default actions;
