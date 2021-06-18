import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default class RegisterProperty implements IRegisterProperty {
  id?: string;
  name?: string;
  valueTypeId?: string;

  constructor(registerProperty?: IRegisterProperty) {
    if (!registerProperty) {
      return;
    }
    this.id = registerProperty.id;
    this.name = registerProperty.name;
    this.valueTypeId = registerProperty.valueTypeId;
  }
}
