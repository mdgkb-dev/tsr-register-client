import { MkbLevel } from '@/interfaces/MkbLevel';

export default interface IMkbElement {
  id?: string;
  fullName: string;
  classId: string;
  level: MkbLevel;
}
