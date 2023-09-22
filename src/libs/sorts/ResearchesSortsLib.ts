import Research from '@/classes/Research';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const ResearchesSortsLib = (() => {
  function byOrder(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(Research, String(ClassHelper.GetPropertyName(Research).order), order ? order : Orders.Asc);
  }
  return {
    byOrder,
  };
})();

export default ResearchesSortsLib;