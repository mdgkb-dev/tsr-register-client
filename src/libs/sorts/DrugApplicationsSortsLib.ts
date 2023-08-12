import DrugApplication from '@/classes/DrugApplication';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const DrugApplicationsSortsLib = (() => {
  const modelName = 'drugApplication';

  function byNumber(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      ClassHelper.GetPropertyName(DrugApplication).number,
      order ? order : Orders.Asc,
      `По номеру ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`,
      order === Orders.Desc ? false : true
    );
  }

  function byDate(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      String(ClassHelper.GetPropertyName(DrugApplication).date),
      order ? order : Orders.Asc,
      `По дате ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`
    );
  }

  return {
    byNumber,
    byDate,
  };
})();

export default DrugApplicationsSortsLib;
