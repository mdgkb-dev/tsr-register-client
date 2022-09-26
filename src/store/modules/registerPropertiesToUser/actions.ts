import { ActionTree } from 'vuex';

import IRegisterProperty from '@/interfaces/IRegisterProperty';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('register-properties-to-user');

const actions: ActionTree<State, RootState> = {
  create: async (_, payload: IRegisterProperty): Promise<void> => {
    await httpClient.post<IRegisterProperty, IRegisterProperty>({ payload });
  },
  delete: async (_, id: string): Promise<void> => {
    await httpClient.delete<IRegisterProperty, IRegisterProperty>({ query: id });
  },
};

export default actions;
