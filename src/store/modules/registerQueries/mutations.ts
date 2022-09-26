import { MutationTree } from 'vuex';

import RegisterQuery from '@/classes/RegisterQuery';
import RegisterQueryToRegisterProperty from '@/classes/RegisterQueryToRegisterProperty';
import IRegisterQuery from '@/interfaces/IRegisterQuery';
import IRegisterQueryToRegisterProperty from '@/interfaces/IRegisterQueryToRegisterProperty';

import State from './state';

const mutations: MutationTree<State> = {
  setAll(state, registerQueries: IRegisterQuery[]): void {
    state.registerQueries = registerQueries.map((a: IRegisterQuery) => new RegisterQuery(a));
  },
  set(state, registerQuery: IRegisterQuery): void {
    state.registerQuery = new RegisterQuery(registerQuery);
  },
  create(state, payload: IRegisterQuery): void {
    state.registerQueries.push(new RegisterQuery(payload));
  },
  update(state, payload: IRegisterQuery): void {
    const item = state.registerQueries.find((i: IRegisterQuery) => i.id === payload.id);

    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string): void {
    const i = state.registerQueries.findIndex((item: IRegisterQuery) => item.id === id);
    state.registerQueries.splice(i, 1);
  },
  addQueryToProperty(state): void {
    state.registerQuery.registerQueryToRegisterProperty.push(new RegisterQueryToRegisterProperty());
  },
  removeQueryToProperty(state, queryToProperty: IRegisterQueryToRegisterProperty): void {
    const index = state.registerQuery.registerQueryToRegisterProperty.indexOf(queryToProperty);

    if (index !== -1) {
      state.registerQuery.registerQueryToRegisterProperty.splice(index, 1);

      if (queryToProperty.id) {
        state.registerQuery.registerQueryToRegisterPropertyForDelete.push(queryToProperty.id);
      }
    }
  },
  clearQueryToProperty(state): void {
    state.registerQuery.registerQueryToRegisterProperty = [];
  },
  setIsAddProperty(state, isAddPropertyDisabled: boolean): void {
    state.isAddPropertyDisabled = isAddPropertyDisabled;
  },
};

export default mutations;
