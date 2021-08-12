import { MutationTree } from 'vuex';

import Register from '@/classes/registers/Register';
import IRegister from '@/interfaces/registers/IRegister';

import { State } from './state';
import RegisterGroupToRegister from '@/classes/registers/RegisterGroupToRegister';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';

const mutations: MutationTree<State> = {
  setAll(state, registers: IRegister[]) {
    state.registers = registers.map((a: IRegister) => new Register(a));
  },
  set(state, register: IRegister) {
    state.register = new Register(register);
  },
  create(state, payload: IRegister) {
    state.registers.push(new Register(payload));
  },
  update(state, payload: IRegister) {
    const item = state.registers.find((i: IRegister) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.registers.findIndex((item: IRegister) => item.id === id);
    state.registers.splice(i, 1);
  },
  addRegisterGroup(state) {
    state.register.registerGroupToRegister.push(new RegisterGroupToRegister());
  },
  removeRegisterGroup(state, item: IRegisterGroupToRegister) {
    const index = state.register.registerGroupToRegister.indexOf(item);
    if (index !== -1) {
      state.register.registerGroupToRegister.splice(index, 1);
    }
  },
};

export default mutations;
