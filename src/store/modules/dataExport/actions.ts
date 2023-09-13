import { ActionTree } from 'vuex';

import ExportOptions from '@/classes/exportOptions/ExportOptions';
import Cache from '@/services/Cache';
import SearchModel from '@/services/classes/SearchModel';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

const cache = new Cache();
cache.name = 'searchGroups';

const httpClient = new HttpClient('data-export');

const actions: ActionTree<RootState, RootState> = {
  export: async (_, exportOptions: ExportOptions): Promise<void> => {
    const item = await httpClient.get<SearchModel>({ query: `?exportOptions=${JSON.stringify(exportOptions)}`, isBlob: true });
  },
};

export default actions;
