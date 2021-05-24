import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { State } from './state';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

const getters: GetterTree<State, RootState> = {
  representativeTypes(state): IRepresentativeType[] {
    return state.representativeTypes;
  },
  representativeType(state): IRepresentativeType | undefined {
    return state.representativeType;
  },
  getById(state, id: number): IRepresentativeType | undefined {
    return state.representativeTypes.find((item: any) => item.id === id);
  },
};

export default getters;
