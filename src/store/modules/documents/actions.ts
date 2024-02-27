import { ActionTree } from 'vuex';

import Document from '@/classes/Document';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Document, State>('documents'),
};

export default actions;
