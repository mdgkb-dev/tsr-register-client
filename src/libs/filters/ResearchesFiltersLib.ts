import AnamnesisResearch from '@/classes/AnamnesisResearch';
import Research from '@/classes/Research';
import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';

const ResearchesFiltersLib = (() => {
  const modelName = 'research';
  function onlyMkb(): FilterModel {
    return FilterModel.CreateFilterModelWithJoinV2(modelName, 'id', 'mkbResearch', 'id', 'researchId');
  }

  function onlyLaboratory(): FilterModel {
    const fm = FilterModel.CreateFilterModelV2(modelName, 'isLaboratory', DataTypes.Boolean);
    fm.boolean = true;
    return fm;
  }

  function onlyAnamneses(): FilterModel {
    return FilterModel.CreateOnlyWith(Research, AnamnesisResearch);
  }

  return {
    onlyLaboratory,
    onlyMkb,
    onlyAnamneses,
  };
})();

export default ResearchesFiltersLib;
