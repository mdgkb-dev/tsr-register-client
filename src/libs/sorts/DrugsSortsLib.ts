import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';

const DrugsSortsLib = (() => {
  const modelName = 'drug';
  function byNameINN(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      'nameINN',
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
