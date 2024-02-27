import Drug from '@/classes/Drug';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';
const DrugsSortsLib = (() => {
  function byNameINN(order?: Orders): SortModel {
    return SortModel.Create(
      Drug,
      ClassHelper.GetPropertyName(Drug).nameINN,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`,
      order === Orders.Desc ? false : true
    );
  }

  return {
    byNameINN,
  };
})();

export default DrugsSortsLib;
