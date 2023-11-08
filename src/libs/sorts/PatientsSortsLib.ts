import Patient from '@/classes/Patient';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const PatientsSortsLib = (() => {
  const modelName = 'patient';

  function byFullName(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      ClassHelper.GetPropertyName(Patient).fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`,
      order === Orders.Desc ? false : true
    );
  }

  function byDateBirth(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(
      modelName,
      ClassHelper.GetPropertyName(Patient).dateBirth,
      order ? order : Orders.Asc,
      `По рождению ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`
    );
  }

  function byCreatedAt(order?: Orders): SortModel {
    return SortModel.CreateSortModelV2(modelName, 'createdAt', order ? order : Orders.Asc, `По дате создания ${order === Orders.Asc ? '(вверх)' : '(вниз)'}`);
  }

  return {
    byCreatedAt,
    byFullName,
    byDateBirth,
  };
})();

export default PatientsSortsLib;
