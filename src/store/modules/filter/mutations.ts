import { MutationTree } from 'vuex';

import IFilterModel from '@/interfaces/filters/IFilterModel';

import { State } from './state';

const mutations: MutationTree<State> = {
  setTrigger(state, trigger: string) {
    state.trigger = trigger;
  },
  setStoreModule(state, storeModule: string) {
    state.storeModule = storeModule;
  },
  setOffset(state, offset: number) {
    state.filterQuery.offset = offset;
  },
  setFilterModel(state, filterModel: IFilterModel) {
    let item = state.filterQuery.filterModels.find((i: IFilterModel) => i.id === filterModel.id);
    if (item) {
      item = filterModel;
    } else {
      state.filterQuery.filterModels.push(filterModel);
    }
  },
  spliceFilterModel(state, id: string) {
    const index = state.filterQuery.filterModels.findIndex((i: IFilterModel) => i.id === id);
    if (index > -1) state.filterQuery.filterModels.splice(index, 1);
  },
};

export default mutations;
