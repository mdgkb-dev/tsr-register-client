import { ExportOptionsObject } from '@/classes/exportOptions/ExportOptions';
import ExportOptionsKey from '@/classes/exportOptions/ExportOptionsKey';

const PatientsExportOptionLib = (() => {
  function allPatients(): ExportOptionsObject {
    const option = {
      ids: [],
      withAge: false,
      countAverageAge: false,
    };
    return { [ExportOptionsKey.Patient]: option };
  }

  function manyPatients(ids: (string | undefined)[]): ExportOptionsObject {
    const option = {
      ids: ids,
    };
    return { [ExportOptionsKey.Patient]: option };
  }

  function onePatient(id?: string): ExportOptionsObject {
    const option = {
      ids: [id],
      withAge: false,
      countAverageAge: false,
    };
    return { [ExportOptionsKey.Patient]: option };
  }

  return {
    onePatient,
    manyPatients,
    allPatients,
  };
})();

export default PatientsExportOptionLib;
