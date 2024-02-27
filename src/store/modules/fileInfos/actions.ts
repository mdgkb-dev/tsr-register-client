import { ActionTree } from 'vuex';

import FileInfo from '@/classes/files/FileInfo';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<FileInfo, State>('file-infos'),
};

export default actions;
