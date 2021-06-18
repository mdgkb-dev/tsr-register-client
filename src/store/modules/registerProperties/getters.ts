import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IValueType from '@/interfaces/valueTypes/IValueType';
import { State } from './state';

const getters: GetterTree<State, RootState> = {
  registerProperties(state): IRegisterProperty[] | undefined {
    const { registerProperties } = state;
    return registerProperties;
  },
  valueTypes(state): IValueType[] | undefined {
    const { valueTypes } = state;
    return valueTypes;
  },
  registerProperty(state): IRegisterProperty | undefined {
    const { registerProperty } = state;
    return registerProperty;
  },
  getById(state, id: string): IRegisterProperty | undefined {
    const { registerProperties } = state;
    return registerProperties ? registerProperties.find((item: IRegisterProperty) => item.id === id) : undefined;
  },
};

export default getters;
