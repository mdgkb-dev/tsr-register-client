import { GetterTree } from 'vuex';

import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import { RootState } from '@/store/types';

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
  representativeToPatient(state): IRepresentativeToPatient[] {
    return state.representative.representativeToPatient;
  },
};

export default getters;
