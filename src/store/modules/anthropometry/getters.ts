import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import { State } from './state';

const getters: GetterTree<State, RootState> = {
  anthropometries(state): IAnthropometry[] | undefined {
    const { anthropometries } = state;
    return anthropometries;
  },
  anthropometry(state): IAnthropometry | undefined {
    const { anthropometry } = state;
    return anthropometry;
  },
  getById(state, id: string): IAnthropometry | undefined {
    const { anthropometries } = state;
    return anthropometries ? anthropometries.find((item: IAnthropometry) => item.id === id) : undefined;
  },
};

export default getters;
