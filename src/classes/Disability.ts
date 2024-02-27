import { v4 as uuidv4 } from 'uuid';

import Edv from '@/classes/Edv';
import Patient from '@/classes/Patient';
import IEdv from '@/interfaces/disabilities/IEdv';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class Disability {
  id?: string;
  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  patient?: Patient;
  patientId?: string;
  @ClassHelper.GetClassConstructor(Edv)
  edvs: Edv[] = [];
  series = '';
  number = '';

  constructor(i?: Disability) {
    ClassHelper.BuildClass(this, i);
  }

  getActuallyEdv(): Edv | undefined {
    return this.edvs[this.edvs.length - 1];
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

  addEdv(): Edv {
    const edv = new Edv();
    edv.id = uuidv4();
    edv.disabilityId = this.id;
    this.edvs.push(edv);
    return edv;
  }

  removeEdv(id: string): void {
    ClassHelper.RemoveFromClassById(id, this.edvs, []);
  }

  static GetClassName(): string {
    return 'disability';
  }
}
