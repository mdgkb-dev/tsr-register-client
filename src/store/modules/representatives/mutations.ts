import { MutationTree } from 'vuex';

import Representative from '@/classes/representatives/Representative';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICount from '@/interfaces/meta/ICount';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

import { State } from './state';
import IFile from '@/interfaces/files/IFile';
import IFileInfoToDocument from '@/interfaces/documents/IFileInfoToDocument';

const mutations: MutationTree<State> = {
  setAll(state, representatives: IRepresentative[]) {
    state.representatives = representatives.map((r: IRepresentative) => new Representative(r));
  },
  set(state, representative: IRepresentative) {
    state.photoFileList = [];
    state.representative = new Representative(representative);
    if (state.representative.human.photo) state.photoFileList[0] = state.representative.human.photo.getFileListObject();
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
    if (item.id) state.representative.representativeToPatientForDelete.push(item.id);
  },
  addDocument(state, item: IDocument) {
    state.representative.human.documents.push(item);
  },
  removeDocument(state, id: string) {
    const i = state.representative.human.documents.findIndex((item: IDocument) => item.id === id);
    if (i > -1) state.representative.human.documents.splice(i, 1);
    state.representative.human.documentsForDelete.push(id);
  },
  addDocumentsFiles(state, items: IFileInfoToDocument[]) {
    const i = state.representative.human.documents.findIndex((doc: IDocument) => doc.id === items[0].documentId);
    if (i > -1) {
      state.representative.human.documents[i].fileInfoToDocument = [
        ...state.representative.human.documents[i].fileInfoToDocument,
        ...items,
      ];
    }
  },
  addFiles(state, item: IFileInfo) {
    state.representative.human.fileInfos.push(item);
  },
  removeFile(state, fileInfoToDocumentId: string) {
    state.representative.human.documents.forEach((doc: IDocument) => {
      doc.fileInfoToDocument.forEach((fileInfoToDocument: IFileInfoToDocument, i: number) => {
        if (fileInfoToDocument.id === fileInfoToDocumentId) {
          doc.fileInfoToDocumentForDelete.push(fileInfoToDocumentId);
          doc.fileInfoToDocument.splice(i, 1);
        }
      });
    });
  },
  setFilteredItems(state, items: IRepresentative[]) {
    state.filteredRepresentatives = items.map((p: IRepresentative) => new Representative(p));
  },
  resetRepresentative(state) {
    state.representative = new Representative();
  },

  setPhoto(state, file: IFileInfo) {
    state.representative.human.photo = file;
    state.representative.human.photoId = file.id;
  },
  setFileList(state, file: IFile) {
    if (!state.representative.human.photo) return;
    state.representative.human.photo.file = file.blob;
    if (state.representative.human.photo.fileSystemPath) {
      state.photoFileList[0] = { name: state.representative.human.photo.fileSystemPath, url: file.src };
    }
  },
  removePhoto(state) {
    state.representative.human.photo = undefined;
    state.representative.human.photoId = undefined;
  },
};

export default mutations;
