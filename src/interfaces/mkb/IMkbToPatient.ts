import IMkb from '@/interfaces/mkb/IMkbClass';

export default interface IMkbToPatient {
  id?: string;
  primary: boolean;
  mkbId: string;
  patientId: string;
  mkb: IMkb;
}
