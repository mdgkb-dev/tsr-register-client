import IPeriod from '@/interfaces/shared/IPeriod';
import IPatient from '@/interfaces/patients/IPatient';
import IEdv from '@/interfaces/disabilities/IEdv';

export default interface IDisability {
  id?: string;
  period?: IPeriod;
  patientId?: string;
  patient?: IPatient;
  edvs?: IEdv[];

  getActuallyEdv: () => IEdv;
}
