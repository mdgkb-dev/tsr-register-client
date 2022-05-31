import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import Provider from '@/services/Provider';

const PatientsSortsLib = (() => {
  function byFullName(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.patient.tableName,
      Provider.schema.value.patient.fullName,
      order ? order : Orders.Asc,
      'По ФИО',
      true
    );
  }

  function byDateBirth(order?: Orders): ISortModel {
    return SortModel.CreateSortModel(
      Provider.schema.value.patient.tableName,
      Provider.schema.value.patient.dateBirth,
      order ? order : Orders.Asc,
      'По дате рождения',
      false
    );
  }

  return {
    byFullName,
    byDateBirth,
  };
})();

export default PatientsSortsLib;
