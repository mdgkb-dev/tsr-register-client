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

  private setOptions(...options: ExportOptionsObject[]) {
    options.forEach((o: ExportOptionsObject) => {
      for (const i in o) {
        this.options[i] = o;
      }
    });
  }

  static XLSX(...options: ExportOptionsObject[]): ExportOptions {
    const rootOptions = new ExportOptions(ExportTypes.XLSX);
    rootOptions.setOptions(...options);
    return rootOptions;
  }

  static PDF(...options: ExportOptionsObject[]): ExportOptions {
    const rootOptions = new ExportOptions(ExportTypes.PDF);
    rootOptions.setOptions(...options);
    return rootOptions;
  }
}
