import { GetterTree } from 'vuex';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import State from './state';
import { RootState } from '@/store/types';

const getters: GetterTree<State, RootState> = {
  documentType(state: State): IDocumentType | undefined {
    return state.documentType;
  },
  documentTypes(state: State): IDocumentType[] | undefined {
    return state.documentTypes;
  }
}

export default getters;
