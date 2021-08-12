import { GetterTree } from 'vuex';

import IRegister from '@/interfaces/registers/IRegister';
import { RootState } from '@/store/types';

import { State } from './state';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';

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
  registerGroupToRegister(state): IRegisterGroupToRegister[] {
    return state.register.registerGroupToRegister;
  },
};

export default getters;
