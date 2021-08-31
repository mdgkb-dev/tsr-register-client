import IDisability from '@/interfaces/disabilities/IDisability';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPeriod from '@/interfaces/shared/IPeriod';

export default interface IEdv {
  id?: string;
  disabilityId?: string;
  period?: IPeriod;
  parameter1: boolean;
  parameter2: boolean;
  parameter3: boolean;
  disability?: IDisability;

  fileInfo?: IFileInfo;
  fileInfoId?: string;
}
