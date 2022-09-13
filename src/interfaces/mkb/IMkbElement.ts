import { MkbLevel } from '@/interfaces/mkb/MkbLevel';

export default interface IMkbElement {
  id?: string;
  fullName: string;
  classId: string;
  level: MkbLevel;
}
