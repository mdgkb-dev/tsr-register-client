import SortModel from '@/services/classes/SortModel';
import { Orders } from '@/services/interfaces/Orders';

const ResearchesResultsSortsLib = (() => {
  const modelName = 'researchResult';

  function byDate(order?: Orders): SortModel {
    return SortModel.CreateSortModel(modelName, 'date', order ? order : Orders.Asc);
  }

  return {
    byDate,
  };
})();

export default ResearchesResultsSortsLib;
