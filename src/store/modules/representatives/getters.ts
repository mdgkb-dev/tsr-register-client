import { GetterTree } from 'vuex';

import IDocument from '@/interfaces/documents/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFIlesList from '@/interfaces/files/IFIlesList';
import IHuman from '@/interfaces/humans/IHuman';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  representatives(state): IRepresentative[] {
    return state.representatives;
  },
  representative(state): IRepresentative | undefined {
    return state.representative;
  },
  getById(state, id: string): IRepresentative | undefined {
    return state.representatives.find((item: IRepresentative) => item.id === id);
  },
  getHuman(state: State): IHuman {
    return state.representative.human;
  },
  representativeToPatient(state): IRepresentativeToPatient[] {
    return state.representative.representativeToPatient;
  },
  documents(state): IDocument[] {
    return state.representative.human.documents;
  },
  fileInfos(state): IFileInfo[] {
    return state.representative.human.fileInfos;
  },
  count(state): number {
    return state.count;
  },
  filteredRepresentatives(state): IRepresentative[] {
    return state.filteredRepresentatives;
  },
  fileList(state): IFIlesList[] {
    return state.photoFileList;
  },
  fileInfo(state): IFileInfo | undefined {
    return state.representative.human.photo;
  },
};

export default getters;
