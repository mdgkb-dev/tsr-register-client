import ClassHelper from '@/services/ClassHelper';

export default class RegisterQueryToRegisterProperty {
  id?: string;
  registerQueryId?: string;
  registerPropertyId?: string;
  order = 0;
  isAggregate = false;

  constructor(i?: RegisterQueryToRegisterProperty) {
    ClassHelper.BuildClass(this, i);
  }
}
