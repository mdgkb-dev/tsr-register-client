import RegisterQueryToRegisterProperty from '@/classes/RegisterQueryToRegisterProperty';
import IRegisterQuery from '@/interfaces/IRegisterQuery';
import IRegisterQueryToRegisterProperty from '@/interfaces/IRegisterQueryToRegisterProperty';

export default class RegisterQuery implements IRegisterQuery {
  id?: string;
  name?: string;
  type?: 'plain' | 'group' | 'aggregate';
  registerId?: string;
  registerQueryToRegisterProperty: IRegisterQueryToRegisterProperty[] = [];
  registerQueryToRegisterPropertyForDelete: string[] = [];

  constructor(registerQuery?: IRegisterQuery) {
    if (!registerQuery) {
      return;
    }

    this.id = registerQuery.id;
    this.name = registerQuery.name;
    this.type = registerQuery.type;
    this.registerId = registerQuery.registerId;

    if (registerQuery.registerQueryToRegisterProperty) {
      this.registerQueryToRegisterProperty = registerQuery.registerQueryToRegisterProperty.map(
        (queryToProperty) => new RegisterQueryToRegisterProperty(queryToProperty)
      );
    }
  }
}
