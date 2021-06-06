import { MutationTree } from 'vuex';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import State from './state';

const mutations: MutationTree<State> = {
  set(state: State, documentType: IDocumentType): void {
    state.documentType = documentType;
  },
  setAll(state: State, documentTypes: IDocumentType[]): void {
    state.documentTypes = [...documentTypes];
  },
  delete(state: State, id: string): void {
    state.documentTypes = state.documentTypes
      ? state.documentTypes.filter((type) => { return type.id != id })
      : [];
  }
}

export default mutations;
