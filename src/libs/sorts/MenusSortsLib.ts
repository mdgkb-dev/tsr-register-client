import Menu from '@/services/classes/Menu';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const MenusSortsLib = (() => {
  function byOrder(order?: Orders): SortModel {
    return SortModel.Create(Menu, ClassHelper.GetPropertyName(Menu).order, order ? order : Orders.Asc);
  }
  return {
    byOrder,
  };
})();

export default MenusSortsLib;
