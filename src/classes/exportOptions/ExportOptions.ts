import ExportTypes from '@/classes/exportOptions/ExportTypes';

export type ExportOptionsObject = Record<string, unknown>;
export type ExportOptionsMap = {
  [key: string]: ExportOptionsObject;
};

export default class ExportOptions {
  exportType: ExportTypes = ExportTypes.XLSX;
  options: ExportOptionsMap = {};

  constructor(exportType: ExportTypes) {
    this.exportType = exportType;
  }

  static XLSX(...options: ExportOptionsObject[]): ExportOptions {
    const rootOptions = new ExportOptions(ExportTypes.XLSX);
    options.forEach((o: ExportOptionsObject) => {
      for (const i in o) {
        rootOptions.options[i] = o;
      }
    });
    return rootOptions;
  }
}
