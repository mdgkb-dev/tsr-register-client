import { GetterTree } from 'vuex';

import IDisability from '@/interfaces/disabilities/IDisability';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  disabilities(state): IDisability[] | undefined {
    return state.disabilities;
  },
  disability(state): IDisability | undefined {
    return state.disability;
  },
  getById(state, id: string): IDisability | undefined {
    return state.disabilities ? state.disabilities.find((item: IDisability) => item.id === id) : undefined;
  },
};

export default getters;
