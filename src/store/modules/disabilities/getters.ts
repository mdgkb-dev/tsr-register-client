import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import IDisability from '@/interfaces/disabilities/IDisability';
import { State } from './state';

const getters: GetterTree<State, RootState> = {
  disabilities(state): IDisability[] | undefined {
    return state.disabilities;
  },
  disability(state): IDisability | undefined {
    return state.disability;
  },
  getById(state, id: number): IDisability | undefined {
    return state.disabilities ? state.disabilities.find((item: any) => item.id === id) : undefined;
  },
};

export default getters;
