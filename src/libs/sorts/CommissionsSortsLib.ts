import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';

const CommissionsSortsLib = (() => {
  const modelName = 'commission';

  function byNumber(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      'number',
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`,
      order === Orders.Desc ? false : true
    );
  }

  function byDate(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      'date',
      order ? order : Orders.Asc,
      `По рождению ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`
    );
  }

  return {
    byNumber,
    byDate,
  };
})();

export default CommissionsSortsLib;
