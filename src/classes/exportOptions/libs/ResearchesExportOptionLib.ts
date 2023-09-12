import { ExportOptionsObject } from '@/classes/exportOptions/ExportOptions';
import ExportOptionsKey from '@/classes/exportOptions/ExportOptionsKey';

const ResearchesExportOptionLib = (() => {
  function allResearches(): ExportOptionsObject {
    const option = {
      ids: [],
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
    allResearches,
    oneResearch,
  };
})();

export default ResearchesExportOptionLib;
