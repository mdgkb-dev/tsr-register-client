import FilterModel from '@/services/classes/filters/FilterModel';

const ResearchesFiltersLib = (() => {
  const modelName = 'research';
  function onlyMkb(): FilterModel {
    return FilterModel.CreateFilterModelWithJoinV2(modelName, 'id', 'mkbResearch', 'id', 'researchId');
  }

  function onlyAnamneses(): FilterModel {
    return FilterModel.CreateFilterModelWithJoinV2(modelName, 'id', 'anamnesisResearch', 'id', 'researchId');
  }
  return {
    onlyMkb,
    onlyAnamneses,
  };
})();

export default ResearchesFiltersLib;
