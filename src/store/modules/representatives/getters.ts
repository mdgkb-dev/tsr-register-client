import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import { State } from './state';

const getters: GetterTree<State, RootState> = {
  representatives(state): IRepresentative[] {
    return state.representatives;
  },
  representative(state): IRepresentative | undefined {
    return state.representative;
  },
  getById(state, id: string): IRepresentative | undefined {
    return state.representatives.find((item: IRepresentative) => item.id === id);
  },
};

export default getters;
