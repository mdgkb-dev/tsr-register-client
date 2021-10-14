import { MutationTree } from 'vuex';

import RepresentativeType from '@/classes/representatives/RepresentativeType';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, representativeTypes: IRepresentativeType[]) {
    state.representativeTypes = representativeTypes?.map((r: IRepresentativeType) => new RepresentativeType(r));
  },
  set(state, representativeType: IRepresentativeType) {
    state.representativeType = new RepresentativeType(representativeType);
  },
  create(state, payload: IRepresentativeType) {
    state.representativeTypes.push(new RepresentativeType(payload));
  },
  update(state, payload: IRepresentativeType) {
    const item = state.representativeTypes.find((i: IRepresentativeType) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.representativeTypes.findIndex((item: IRepresentativeType) => item.id === id);
    state.representativeTypes.splice(i, 1);
  },
};

export default mutations;
