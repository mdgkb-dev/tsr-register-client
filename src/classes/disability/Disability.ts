import Edv from '@/classes/disability/Edv';
import Patient from '@/classes/Patient';
import Period from '@/classes/shared/Period';
import IEdv from '@/interfaces/disabilities/IEdv';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class Disability {
  id?: string;
  period?: Period = new Period();
  periodId?: string;
  patient?: Patient;
  patientId?: string;
  @ClassHelper.GetClassConstructor(Edv)
  edvs: Edv[] = [];

  constructor(i?: Disability) {
    ClassHelper.BuildClass(this, i);
  }

  getActuallyEdv(): IEdv {
    return this.edvs[this.edvs.length - 1];
  }

  dateIsCorrect(): boolean {
    return !(this.period && this.period.dateStart && this.period.dateEnd && this.period.dateStart > this.period.dateEnd);
  }
  static GetFileInfos(items: Disability[]): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];

    items.forEach((i: Disability) => {
      i.edvs.forEach((e: IEdv) => {
        if (e.fileInfo) {
          fileInfos.push(e.fileInfo);
        }
      });
    });

    return fileInfos;
  }
}
