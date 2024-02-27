import AnamnesisResearch from '@/classes/AnamnesisResearch';
import MkbResearch from '@/classes/MkbResearch';
import Research from '@/classes/Research';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';

const ResearchesFiltersLib = (() => {
  function onlyMkb(): FilterModel {
    return FilterModel.OnlyIfSecondModelExists(Research, MkbResearch);
  }

  function onlyLaboratory(): FilterModel {
    const fm = FilterModel.CreateFilterModel(Research, String(ClassHelper.GetPropertyName(Research).isLaboratory), DataTypes.Boolean);
    fm.boolean = true;
    return fm;
  }

  function onlyAnamneses(): FilterModel {
    return FilterModel.OnlyIfSecondModelExists(Research, AnamnesisResearch);
  }

  return {
    onlyLaboratory,
    onlyMkb,
    onlyAnamneses,
  };
})();

export default ResearchesFiltersLib;
