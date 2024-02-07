import Doctor from '@/classes/Doctor';
import EducationalAcademic from '@/classes/EducationalAcademic';
import Employee from '@/classes/Employee';
import Head from '@/classes/Head';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const EmployeesFiltersLib = (() => {
  function onlyMale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Employee, ClassHelper.GetPropertyName(Employee).isMale, DataTypes.Boolean);
    filterModel.boolean = true;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Мужской';
    return filterModel;
  }

  function onlyFemale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Employee, ClassHelper.GetPropertyName(Employee).isMale, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Женский';
    return filterModel;
  }

  function byFullName(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(Employee, ClassHelper.GetPropertyName(Employee).fullName, DataTypes.String);
    filterModel.operator = Operators.Eq;
    filterModel.label = 'По ФИО';
    return filterModel;
  }

  function onlyHeads(): FilterModel {
    const f = FilterModel.OnlyIfSecondModelExists(Employee, Head);
    f.label = 'Только руководители';
    return f;
  }
  function onlyDoctors(): FilterModel {
    const f = FilterModel.OnlyIfSecondModelExists(Employee, Doctor);
    f.label = 'Только врачи';
    return f;
  }
  function onlyEducationalAcademics(): FilterModel {
    const f = FilterModel.OnlyIfSecondModelExists(Employee, EducationalAcademic);
    f.label = 'Только члены учёного совета';
    return f;
  }

  return {
    onlyEducationalAcademics,
    onlyDoctors,
    onlyHeads,
    onlyMale,
    onlyFemale,
    byFullName,
  };
})();

export default EmployeesFiltersLib;
