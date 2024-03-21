import { ActionTree } from 'vuex';

import ExportOptions from '@/classes/exportOptions/ExportOptions';
import Cache from '@/services/Cache';
import SearchModel from '@/services/classes/SearchModel';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';
import FTSP from '@/services/classes/filters/FTSP';
const cache = new Cache();
cache.name = 'searchGroups';

const httpClient = new HttpClient('data-export');

const actions: ActionTree<RootState, RootState> = {
  export: async (_, opts: { exportOptions: ExportOptions; ftsp: FTSP }): Promise<void> => {
    const ftsp = new FTSP(opts.ftsp);
    ftsp.p.offset = 1;
    ftsp.p.limit = 999999999;
    await httpClient.post<unknown, unknown>({
      isBlob: true,
      query: 'ftsp',
      payload: { exportOptions: opts.exportOptions, ftsp: ftsp },
      isFormData: true,
    });
  },
};

export default actions;
