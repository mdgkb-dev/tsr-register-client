import { GetterTree } from 'vuex';

import IRegister from '@/interfaces/registers/IRegister';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import IValueType from '@/interfaces/valueTypes/IValueType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  registers(state): IRegister[] | undefined {
    const { registers } = state;
    return registers;
  },
  item(state): IRegister | undefined {
    return state.item;
  },
  diagnosis(state): IRegisterDiagnosis[] {
    return state.item.registerDiagnosis;
  },
  getById(state, id: string): IRegister | undefined {
    const { registers } = state;
    return registers ? registers.find((item: IRegister) => item.id === id) : undefined;
  },
  getDiagnosis(state): IRegisterDiagnosis[] {
    return state.item.registerDiagnosis;
  },
  valueTypes(state): IValueType[] | undefined {
    const { valueTypes } = state;
    return valueTypes;
  },
  activeCollapseName(state): string {
    return state.activeCollapseName;
  },
};

export default getters;
