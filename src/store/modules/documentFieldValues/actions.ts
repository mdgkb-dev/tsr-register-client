import { ActionTree } from 'vuex';

import DocumentFieldValue from '@/classes/DocumentFieldValue';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DocumentFieldValue, State>('document-field-values'),
};

export default actions;
