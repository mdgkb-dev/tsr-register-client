import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';

export default interface IMkbSubSubGroup {
  id?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  mkbSubGroupId?: string;

  mkbDiagnosis: IMkbDiagnosis[];

  getDiagnosis: (diagnosisId: string) => IMkbDiagnosis | undefined;
}