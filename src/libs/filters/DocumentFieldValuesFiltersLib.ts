import DocumentFieldValue from '@/classes/DocumentFieldValue';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
const DocumentFieldValuesFiltersLib = (() => {
  const modelName = 'documentFieldValue';

  function byValueStrings(value: string): FilterModel {
    const model = FilterModel.CreateFilterModel(modelName, String(ClassHelper.GetPropertyName(DocumentFieldValue).valueString), DataTypes.String);
    model.value1 = value;
    return model;
  }

  return {
    byValueString: byValueStrings,
  };
})();

export default DocumentFieldValuesFiltersLib;
