import IMkb from '@/interfaces/mkb/IMkb';

export default interface IMkbToPatient {
  id?: string;
  primary: boolean;
  mkbId: string;
  patientId: string;
  mkb?: IMkb;
}
