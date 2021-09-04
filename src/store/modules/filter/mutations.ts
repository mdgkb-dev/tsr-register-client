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
    if (filterModel.index === 0) {
      state.filterQuery.filterModels.push(filterModel);
    } else {
      state.filterQuery.filterModels[filterModel.index] = filterModel;
    }
  },
  spliceFilterModel(state, index: number) {
    state.filterQuery.filterModels.splice(index, 1);
  },
};

export default mutations;
