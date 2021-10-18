import IRegisterQueryToRegisterProperty from '@/interfaces/registers/IRegisterQueryToRegisterProperty';

export default class RegisterQueryToRegisterProperty implements IRegisterQueryToRegisterProperty {
  id?: string;
  registerQueryId?: string;
  registerPropertyId?: string;
  order = 0;
  isAggregate = false;

  constructor(queryToProperty?: IRegisterQueryToRegisterProperty) {
    if (!queryToProperty) {
      return;
    }

    this.id = queryToProperty.id;
    this.registerQueryId = queryToProperty.registerQueryId;
    this.registerPropertyId = queryToProperty.registerPropertyId;
    this.order = queryToProperty.order;
    this.isAggregate = queryToProperty.isAggregate;
  }
}
