import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IValueType from '@/interfaces/valueTypes/IValueType';

export interface State {
  registerProperties: IRegisterProperty[];
  valueTypes: IValueType[];
  registerProperty: IRegisterProperty;
}
