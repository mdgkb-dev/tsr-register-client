import { ActionTree } from 'vuex';

import Contact from '@/classes/humans/Contact';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Contact, State>('contacts'),
};

export default actions;
