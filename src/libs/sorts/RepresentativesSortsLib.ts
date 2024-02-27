import Patient from '@/classes/Patient';
import Representative from '@/classes/Representative';
import SortModel from '@/services/classes/SortModel';
import ClassHelper from '@/services/ClassHelper';
import { Orders } from '@/services/interfaces/Orders';

const RepresentativesSortsLib = (() => {
  function byFullName(order?: Orders): SortModel {
    return SortModel.Create(
      Representative,
      ClassHelper.GetPropertyName(Patient).fullName,
      order ? order : Orders.Asc,
      `По ФИО ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`,
      order === Orders.Desc ? false : true
    );
  }

  function byDateBirth(order?: Orders): SortModel {
    return SortModel.Create(
      Representative,
      ClassHelper.GetPropertyName(Patient).dateBirth,
      order ? order : Orders.Asc,
      `По дате рождения ${order === Orders.Asc ? '(по возрастанию)' : '(по убыванию)'}`
    );
  }

  return {
    byFullName,
    byDateBirth,
  };
})();

export default RepresentativesSortsLib;
