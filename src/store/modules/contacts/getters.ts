import { GetterTree } from 'vuex';

import Contact from '@/classes/humans/Contact';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Contact, State>(),
};

export default getters;
