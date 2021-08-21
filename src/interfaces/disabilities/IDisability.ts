import IEdv from '@/interfaces/disabilities/IEdv';
import IPatient from '@/interfaces/patients/IPatient';
import IPeriod from '@/interfaces/shared/IPeriod';

export default interface IDisability {
  id?: string;
  period?: IPeriod;
  periodId?: string;
  patientId?: string;
  patient?: IPatient;
  edvs: IEdv[];

  getActuallyEdv: () => IEdv;
  dateIsCorrect: () => boolean;
}
