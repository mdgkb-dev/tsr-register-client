import DocumentType from '@/classes/DocumentType';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
const DocumentTypesFiltersLib = (() => {
  const modelName = 'documentType';

  function byCode(code: string): FilterModel {
    const model = FilterModel.CreateFilterModel(modelName, String(ClassHelper.GetPropertyName(DocumentType).code), DataTypes.String);
    model.value1 = code;
    return model;
  }

  return {
    byCode,
  };
})();

export default DocumentTypesFiltersLib;
