import { ActionTree } from 'vuex';

import DocumentFileInfo from '@/classes/DocumentFileInfo';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DocumentFileInfo, State>('document-file-infos'),
};

export default actions;
