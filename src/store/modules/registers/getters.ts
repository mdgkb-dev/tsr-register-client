import { GetterTree } from 'vuex';

import IRegister from '@/interfaces/registers/IRegister';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  registers(state): IRegister[] | undefined {
    const { registers } = state;
    return registers;
  },
  register(state): IRegister | undefined {
    return state.register;
  },
  diagnosis(state): IRegisterDiagnosis[] {
    return state.register.registerDiagnosis;
  },
  getById(state, id: string): IRegister | undefined {
    const { registers } = state;
    return registers ? registers.find((item: IRegister) => item.id === id) : undefined;
  },
  registerGroupToRegister(state): IRegisterGroupToRegister[] {
    return state.register.registerGroupToRegister;
  },
  getDiagnosis(state): IRegisterDiagnosis[] {
    return state.register.registerDiagnosis;
  },
};

export default getters;
