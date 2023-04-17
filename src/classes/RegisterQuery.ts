import RegisterQueryToRegisterProperty from '@/classes/RegisterQueryToRegisterProperty';
import ClassHelper from '@/services/ClassHelper';

export default class RegisterQuery {
  id?: string;
  name?: string;
  type?: 'plain' | 'group' | 'aggregate';
  registerId?: string;
  registerQueryToRegisterProperty: RegisterQueryToRegisterProperty[] = [];
  registerQueryToRegisterPropertyForDelete: string[] = [];

  constructor(i?: RegisterQuery) {
    ClassHelper.BuildClass(this, i);
  }
}
