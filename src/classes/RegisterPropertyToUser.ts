import Question from '@/classes/Question';
import UserAuthorized from '@/classes/UserAuthorized';
import ClassHelper from '@/services/ClassHelper';

export default class RegisterPropertyToUser {
  id?: string;
  registerPropertyId = '';
  registerProperty?: Question;
  userId = '';
  user?: UserAuthorized;

  constructor(i?: RegisterPropertyToUser) {
    ClassHelper.BuildClass(this, i);
  }
}
