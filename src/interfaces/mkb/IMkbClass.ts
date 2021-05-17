import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';

export default interface IMkbClass {
  id?: string;
  number?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  leaf: boolean;

  mkbGroups: IMkbGroup[];
  mkbDiagnosis: IMkbDiagnosis[];

  getDiagnosis: (diagnosisId: string) => IMkbDiagnosis | undefined;
}
