import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IValueType from '@/interfaces/valueTypes/IValueType';

export interface State {
  registerProperties: IRegisterProperty[];
  valueTypes: IValueType[];
  registerProperty: IRegisterProperty;
}
