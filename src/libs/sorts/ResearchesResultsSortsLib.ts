import Research from '@/classes/Research';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const ResearchesResultsSortsLib = (() => {
  function byDate(order?: Orders): SortModel {
    return SortModel.Create(Research, ClassHelper.GetPropertyName(Research).date, order ? order : Orders.Asc);
  }

  return {
    byDate,
  };
})();

export default ResearchesResultsSortsLib;
