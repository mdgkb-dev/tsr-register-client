import { MutationTree } from 'vuex';
import IRegister from '@/interfaces/registers/IRegister';
import Register from '@/classes/registers/Register';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, registers: IRegister[]) {
    state.registers = registers.map((a: IRegister) => new Register(a));
  },
  set(state: any, register: IRegister) {
    state.register = new Register(register);
  },
  create(state: any, payload: IRegister) {
    state.registers.push(new Register(payload));
  },
  update(state: any, payload: IRegister) {
    const item = state.registers.find((i: IRegister) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    if (state.registers) {
      const i = state.registers.findIndex((item: IRegister) => item.id === id);
      state.registers.splice(i, 1);
    }
  },
};

export default mutations;
