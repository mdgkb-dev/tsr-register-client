import { MutationTree } from 'vuex';

import Register from '@/classes/registers/Register';
import RegisterGroupToRegister from '@/classes/registers/RegisterGroupToRegister';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';

import { State } from './state';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import RegisterDiagnosis from '@/classes/registers/RegisterDiagnosis';

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
      if (item.id) state.register.registerGroupToRegisterForDelete.push(item.id);
    }
  },
  addDiagnosis(state, id: string) {
    const diagnosis = new RegisterDiagnosis();
    diagnosis.id = id;
    state.register.registerDiagnosis.push(diagnosis);
  },
  removeDiagnosis(state, id: string) {
    const index = state.register.registerDiagnosis.findIndex((i: IRegisterDiagnosis) => i.id === id);
    if (index !== -1) state.register.registerDiagnosis.splice(index, 1);
    state.register.registerDiagnosisForDelete.push(id);
  },
};

export default mutations;
