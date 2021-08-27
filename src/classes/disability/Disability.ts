import Edv from '@/classes/disability/Edv';
import Period from '@/classes/shared/Period';
import IDisability from '@/interfaces/disabilities/IDisability';
import IEdv from '@/interfaces/disabilities/IEdv';
import IPatient from '@/interfaces/patients/IPatient';
import IPeriod from '@/interfaces/shared/IPeriod';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfoToDocument from '@/interfaces/documents/IFileInfoToDocument';

export default class Disability implements IDisability {
  id?: string;
  period?: IPeriod = new Period();
  periodId?: string;
  patient?: IPatient;
  patientId?: string;
  edvs: IEdv[] = [];

  constructor(i?: IDisability) {
    if (!i) return;
    this.id = i.id;
    if (i.period) this.period = new Period(i.period);
    this.periodId = i.periodId;
    this.patientId = i.patientId;
    this.patient = i.patient;
    if (i.edvs) this.edvs = i.edvs.map((e) => new Edv(e));
  }

  getActuallyEdv(): IEdv {
    return this.edvs[this.edvs.length - 1];
  }

  dateIsCorrect(): boolean {
    return !(this.period && this.period.dateStart && this.period.dateEnd && this.period.dateStart > this.period.dateEnd);
  }
  static GetFileInfos(items: IDisability[]): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    items.forEach((i: IDisability) => {
      i.edvs.forEach((e: IEdv) => {
        if (e.fileInfo) fileInfos.push(e.fileInfo);
      });
    });
    return fileInfos;
  }
}
