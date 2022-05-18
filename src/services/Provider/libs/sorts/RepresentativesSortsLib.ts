import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const RepresentativesSortsLib = (() => {
  function byFullName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.representative.tableName,
      Provider.schema.value.representative.fullName,
      order ? order : Orders.Asc,
      'По ФИО',
      true
    );
  }

  return {
    byFullName,
  };
})();

export default RepresentativesSortsLib;
