import IEdv from '@/interfaces/disabilities/IEdv';
import IPeriod from '@/interfaces/shared/IPeriod';

export default interface IDisability {
  id?: string;
  period?: IPeriod;
  periodId?: string;
  patientId?: string;
  patient?: Patient;
  edvs: IEdv[];

  getActuallyEdv: () => IEdv;
  dateIsCorrect: () => boolean;
}
