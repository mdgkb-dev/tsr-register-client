import Commission from '@/classes/Commission';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';
const CommissionsSortsLib = (() => {
  function byNumber(order?: Orders): SortModel {
    return SortModel.Create(
      Commission,
      ClassHelper.GetPropertyName(Commission).number,
      order ? order : Orders.Asc,
      `По номеру ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`,
      order === Orders.Desc ? false : true
    );
  }

  function byDate(order?: Orders): SortModel {
    return SortModel.Create(Commission, ClassHelper.GetPropertyName(Commission).number, order ? order : Orders.Asc, `По дате ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`);
  }

  return {
    byNumber,
    byDate,
  };
})();

export default CommissionsSortsLib;
