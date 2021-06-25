import IEdv from '@/interfaces/disabilities/IEdv';
import IPatient from '@/interfaces/patients/IPatient';
import IPeriod from '@/interfaces/shared/IPeriod';

export default interface IDisability {
  id?: string;
  period?: IPeriod;
  patientId?: string;
  patient?: IPatient;
  edvs?: IEdv[];

  getActuallyEdv: () => IEdv;
}
