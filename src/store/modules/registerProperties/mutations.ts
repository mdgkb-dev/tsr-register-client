import { MutationTree } from 'vuex';

import RegisterProperty from '@/classes/registers/RegisterProperty';
import ValueType from '@/classes/valueTypes/ValueType';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IValueType from '@/interfaces/valueTypes/IValueType';

import { State } from './state';
import RegisterPropertySet from '@/classes/registers/RegisterPropertySet';
import RegisterPropertyRadio from '@/classes/registers/RegisterPropertyRadio';

const mutations: MutationTree<State> = {
  setAll(state, registerProperties: RegisterProperty[]) {
    state.registerProperties = registerProperties.map((a: IRegisterProperty) => new RegisterProperty(a));
  },
  setValueTypes(state, valueTypes: IValueType[]) {
    state.valueTypes = valueTypes.map((a: IValueType) => new ValueType(a));
  },
  set(state, registerProperty: IRegisterProperty) {
    state.registerProperty = new RegisterProperty(registerProperty);
  },
  create(state, payload: IRegisterProperty) {
    state.registerProperties.push(new RegisterProperty(payload));
  },
  update(state, payload: IRegisterProperty) {
    const item = state.registerProperties.find((i: IRegisterProperty) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.registerProperties.findIndex((item: IRegisterProperty) => item.id === id);
    state.registerProperties.splice(i, 1);
  },
  addSetItem(state) {
    state.registerProperty.registerPropertySet.push(new RegisterPropertySet());
  },
  addRadioItem(state) {
    state.registerProperty.registerPropertyRadio.push(new RegisterPropertyRadio());
  },
  removeSetItem(state, i: number) {
    state.registerProperty.registerPropertySet.splice(i, 1);
  },
  removeRadioItem(state, i: number) {
    state.registerProperty.registerPropertyRadio.splice(i, 1);
  },
};

export default mutations;
