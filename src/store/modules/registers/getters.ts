import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import IRegister from '@/interfaces/registers/IRegister';
import { State } from './state';

const getters: GetterTree<State, RootState> = {
  registers(state): IRegister[] | undefined {
    const { registers } = state;
    return registers;
  },
  register(state): IRegister | undefined {
    const { register } = state;
    return register;
  },
  getById(state, id: string): IRegister | undefined {
    const { registers } = state;
    return registers ? registers.find((item: IRegister) => item.id === id) : undefined;
  },
};

export default getters;
