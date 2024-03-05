import Research from '@/classes/Research';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const ResearchesSortsLib = (() => {
  function byName(order?: Orders): SortModel {
    return SortModel.Create(
      Research,
      ClassHelper.GetPropertyName(Research).name,
      order ? order : Orders.Asc,
      `По названию ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`,
      order === Orders.Desc ? false : true
    );
  }

  function byOrder(order?: Orders): SortModel {
    return SortModel.Create(
      Research,
      ClassHelper.GetPropertyName(Research).order,
      order ? order : Orders.Asc,
      `По порядку ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`,
      order === Orders.Desc ? false : true
    );
  }
  return {
    byOrder,
    byName,
  };
})();

export default ResearchesSortsLib;
