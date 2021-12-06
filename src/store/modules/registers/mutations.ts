import { MutationTree } from 'vuex';

import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import Register from '@/classes/registers/Register';
import RegisterDiagnosis from '@/classes/registers/RegisterDiagnosis';
import ValueType from '@/classes/valueTypes/ValueType';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import IValueType from '@/interfaces/valueTypes/IValueType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, registers: IRegister[]) {
    state.registers = registers?.map((a: IRegister) => new Register(a));
  },
  set(state, item: IRegister) {
    state.item = new Register(item);
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
  addDiagnosis(state, id: string) {
    const diagnosis = new RegisterDiagnosis();
    diagnosis.id = id;
    state.item.registerDiagnosis.push(diagnosis);
  },
  removeDiagnosis(state, id: string) {
    const index = state.item.registerDiagnosis.findIndex((i: IRegisterDiagnosis) => i.id === id);
    if (index !== -1) state.item.registerDiagnosis.splice(index, 1);
    state.item.registerDiagnosisForDelete.push(id);
  },
  clearDiagnosis(state, id: string) {
    const diagnosis = state.item.registerDiagnosis.find((d: IRegisterDiagnosis) => d.id === id);
    if (diagnosis) {
      diagnosis.mkbDiagnosis = new MkbDiagnosis();
      diagnosis.mkbDiagnosisId = undefined;
      diagnosis.mkbSubDiagnosis = undefined;
      diagnosis.mkbSubDiagnosisId = undefined;
    }
  },
  setValueTypes(state, valueTypes: IValueType[]) {
    state.valueTypes = valueTypes.map((a: IValueType) => new ValueType(a));
  },
};

export default mutations;
