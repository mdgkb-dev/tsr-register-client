import { ExportOptionsObject } from '@/classes/exportOptions/ExportOptions';
import ExportOptionsKey from '@/classes/exportOptions/ExportOptionsKey';

const ResearchesExportOptionLib = (() => {
  function allResearches(): ExportOptionsObject {
    const option = {
      ids: [],
    };
    return { [ExportOptionsKey.Research]: option };
  }

  function manyResearches(ids: (string | undefined)[]): ExportOptionsObject {
    const option = {
      ids: ids,
    };
    return { [ExportOptionsKey.Research]: option };
  }

  function oneResearch(id?: string): ExportOptionsObject {
    const option = {
      ids: [id],
    };
    return { [ExportOptionsKey.Research]: option };
  }

  return {
    manyResearches,
    allResearches,
    oneResearch,
  };
})();

export default ResearchesExportOptionLib;
