import { GetterTree } from 'vuex';

import IDocument from '@/interfaces/documents/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFIlesList from '@/interfaces/files/IFIlesList';
import IHuman from '@/interfaces/IHuman';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  representatives(state): IRepresentative[] {
    return state.representatives;
  },
  getHuman(state): IHuman {
    return state.representative.human;
  },
  representative(state): IRepresentative | undefined {
    return state.representative;
  },
  getById(state, id: string): IRepresentative | undefined {
    return state.representatives.find((item: IRepresentative) => item.id === id);
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
  filteredRepresentatives(state): IRepresentative[] {
    return state.filteredRepresentatives;
  },
  fileList(state): IFIlesList[] {
    return state.photoFileList;
  },
  fileInfo(state): IFileInfo | undefined {
    return state.representative.human.photo;
  },
  count(state): number {
    return state.count;
  },
  isEditMode(state): boolean {
    return state.isEditMode;
  },
  lastInsertedId(state): string | undefined {
    return state.lastInsertedId;
  },
};

export default getters;
