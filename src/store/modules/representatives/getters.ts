import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { State } from './state';
import IRepresentative from '@/interfaces/representatives/IRepresentative';

const getters: GetterTree<State, RootState> = {
  representatives(state): IRepresentative[] {
    return state.representatives;
  },
  representative(state): IRepresentative | undefined {
    return state.representative;
  },
  getById(state, id: number): IRepresentative | undefined {
    return state.representatives.find((item: any) => item.id === id);
  },
};

export default getters;
