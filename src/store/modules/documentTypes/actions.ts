import { ActionTree } from 'vuex';

import DocumentType from '@/classes/DocumentType';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DocumentType, State>('document-types'),
};

export default actions;
