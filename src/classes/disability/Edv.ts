import Period from '@/classes/shared/Period';
import IEdv from '@/interfaces/disabilities/IEdv';
import IPeriod from '@/interfaces/shared/IPeriod';
import FileInfo from '@/classes/files/FileInfo';

export default class Edv implements IEdv {
  id?: string;
  period?: IPeriod = new Period();
  disabilityId?: string;
  parameter1 = false;
  parameter2 = false;
  parameter3 = false;
  fileInfoId?: string;
  fileInfo?: FileInfo;

  constructor(i?: IEdv) {
    if (!i) return;
    this.id = i.id;
    this.period = i.period;
    this.disabilityId = i.disabilityId;
    this.parameter1 = i.parameter1;
    this.parameter2 = i.parameter2;
    this.parameter3 = i.parameter3;
    this.fileInfoId = i.fileInfoId;
    if (i.fileInfo) this.fileInfo = new FileInfo(i.fileInfo);
  }
}
