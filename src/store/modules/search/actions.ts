import { ActionTree } from 'vuex';

import SearchElement from '@/classes/SearchElement';
import Cache from '@/services/Cache';
import SearchModel from '@/services/classes/SearchModel';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const cache = new Cache();
cache.name = 'searchGroups';

const httpClient = new HttpClient('search');

const actions: ActionTree<State, RootState> = {
  search: async (_, searchModel: SearchModel): Promise<void> => {
    const item = await httpClient.get<SearchModel>({ query: `?searchModel=${searchModel.toUrl()}` });
    if (item) {
      item.searchGroup.options.forEach((opt: SearchElement) => {
        searchModel.searchObjects.push({
          id: opt.id,
          value: opt.value,
          label: opt.label,
          description: opt.description,
        });
      });
    }
  },
  mainSearch: async ({ commit }, searchModel: SearchModel): Promise<void> => {
    commit('setSearchModel', await httpClient.get<SearchModel>({ query: `/main?searchModel=${searchModel.toUrl()}` }));
  },
  full: async ({ commit }, searchModel: SearchModel): Promise<void> => {
    commit('setSearchModel', await httpClient.get<SearchModel>({ query: `full?searchModel=${searchModel.toUrl()}` }));
  },
  searchGroups: async ({ commit, state }): Promise<void> => {
    if (state.searchModel.searchGroups.length > 0) {
      return;
    }
    const get = async () => {
      return await httpClient.get<SearchModel>({ query: `search-groups` });
    };
    commit('setSearchGroups', await cache.storeGetWithCache<SearchModel>(get));
  },
};

export default actions;
