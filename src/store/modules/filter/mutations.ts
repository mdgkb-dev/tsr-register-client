import { MutationTree } from 'vuex';

import IFilterModel from '@/interfaces/filters/IFilterModel';

import { State } from './state';

const mutations: MutationTree<State> = {
  setTrigger(state, trigger: string) {
    if (trigger == 'manual' && state.trigger == 'manual') {
      trigger = 'click';
    }
    state.trigger = trigger;
  },
  resetId(state) {
    state.filterQuery.id = undefined;
  },
  setStoreModule(state, storeModule: string) {
    state.storeModule = storeModule;
  },
  setOffset(state, offset: number) {
    state.filterQuery.offset = offset;
  },
  resetQueryFilter(state) {
    state.filterQuery.filterModels.forEach((filterModel: IFilterModel) => {
      filterModel.isSet = false;
      filterModel.value1 = '';
      filterModel.date1 = undefined;
      filterModel.date2 = undefined;
      filterModel.set = [];
    });
    state.filterQuery.filterModels = [];
  },
  setFilterModel(state, filterModel: IFilterModel) {
    filterModel.isSet = true;
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
