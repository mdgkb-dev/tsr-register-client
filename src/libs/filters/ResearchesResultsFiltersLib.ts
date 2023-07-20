import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';

const ResearchesResultsFiltersLib = (() => {
  const model = 'researchResult';
  function byResearchId(id: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(model, 'researchId', DataTypes.String);
    filterModel.value1 = id;
    return filterModel;
  }

  function byPatientId(id: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(model, 'patientId', DataTypes.String);
    filterModel.value1 = id;
    return filterModel;
  }

  function byPatientResearchId(id: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(model, 'patientResearchId', DataTypes.String);
    filterModel.value1 = id;
    return filterModel;
  }

  return {
    byPatientResearchId,
    byPatientId,
    byResearchId,
  };
})();

export default ResearchesResultsFiltersLib;
