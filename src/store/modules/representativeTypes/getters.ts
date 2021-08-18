import { GetterTree } from 'vuex';

import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  representativeTypes(state): IRepresentativeType[] {
    return state.representativeTypes;
  },
  representativeType(state): IRepresentativeType | undefined {
    return state.representativeType;
  },
  getById(state, id: string): IRepresentativeType | undefined {
    return state.representativeTypes.find((item: IRepresentativeType) => item.id === id);
  },
};

export default getters;
