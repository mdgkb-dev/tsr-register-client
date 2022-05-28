import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const PatientsSortsLib = (() => {
  function byFullName(order?: Orders): ISortModel {
    console.log(Provider.schema.value);
    return SortModel.CreateSortModel(
      Provider.schema.value.patient.tableName,
      Provider.schema.value.patient.fullName,
      order ? order : Orders.Asc,
      'По ФИО',
      true
    );
  }

  return {
    byFullName,
  };
})();

export default PatientsSortsLib;
