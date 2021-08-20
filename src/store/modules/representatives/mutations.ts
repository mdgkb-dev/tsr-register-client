import { MutationTree } from 'vuex';

import Representative from '@/classes/representatives/Representative';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICount from '@/interfaces/meta/ICount';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, representatives: IRepresentative[]) {
    state.representatives = representatives.map((r: IRepresentative) => new Representative(r));
  },
  setCount(state, count: ICount[]) {
    state.count = Number(count[0].count);
  },
  set(state, representative: IRepresentative) {
    state.representative = new Representative(representative);
  },
  create(state, payload: IRepresentative) {
    state.representatives.push(new Representative(payload));
  },
  update(state, payload: IRepresentative) {
    const item = state.representatives.find((i: IRepresentative) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.representatives.findIndex((item: IRepresentative) => item.id === id);
    state.representatives.splice(i, 1);
  },
  addPatient(state) {
    state.representative.representativeToPatient.push(new RepresentativeToPatient());
  },
  removePatient(state, item: IRepresentativeToPatient) {
    const index = state.representative.representativeToPatient.indexOf(item);
    if (index !== -1) state.representative.representativeToPatient.splice(index, 1);
  },
  addDocument(state, item: IDocument) {
    state.representative.human.documents.push(item);
  },
  removeDocument(state, id: string) {
    const i = state.representative.human.documents.findIndex((item: IDocument) => item.id === id);
    if (i > -1) state.representative.human.documents.splice(i, 1);
  },
  addFiles(state, item: IFileInfo) {
    state.representative.human.fileInfos.push(item);
  },
  removeFile(state, id: string) {
    const i = state.representative.human.fileInfos.findIndex((item: IFileInfo) => item.id === id);
    if (i > -1) state.representative.human.fileInfos.splice(i, 1);
  },
  setFilteredItems(state, items: IRepresentative[]) {
    state.filteredRepresentatives = items.map((p: IRepresentative) => new Representative(p));
  },
  resetRepresentative(state) {
    state.representative = new Representative();
  },
};

export default mutations;
