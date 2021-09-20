import { MutationTree } from 'vuex';

import DocumentType from '@/classes/documents/DocumentType';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import IDocumentTypeField from '@/interfaces/documents/IDocumentTypeField';

import State from './state';

const mutations: MutationTree<State> = {
  set(state: State, documentType: IDocumentType): void {
    state.documentType = new DocumentType(documentType);
  },
  setAll(state: State, documentTypes: IDocumentType[]): void {
    state.documentTypes = [...documentTypes];
  },
  delete(state: State, id: string): void {
    state.documentTypes = state.documentTypes ? state.documentTypes.filter((type) => type.id !== id) : [];
  },
  removeField(state: State, field: IDocumentTypeField): void {
    const index = state.documentType.documentTypeFields.indexOf(field);
    if (index !== -1) {
      state.documentType.documentTypeFields.splice(index, 1);
    }
    if (field.id) {
      state.documentType.documentTypeFieldsForDelete.push(field.id);
    }
  },
};

export default mutations;
