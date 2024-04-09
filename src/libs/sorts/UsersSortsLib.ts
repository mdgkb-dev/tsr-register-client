import User from '@/classes/User';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const UsersSortsLib = (() => {
  function byEmail(order?: Orders): SortModel {
    return SortModel.Create(
      User,
      ClassHelper.GetPropertyName(User).email,
      order ? order : Orders.Asc,
      `По названию ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`,
      order === Orders.Desc ? false : true
    );
  }

  return {
    byEmail,
  };
})();

export default UsersSortsLib;
