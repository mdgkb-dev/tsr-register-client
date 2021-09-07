import { v4 as uuidv4 } from 'uuid';

import MkbGroup from '@/classes/mkb/MkbGroup';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import RegisterDiagnosis from '@/classes/registers/RegisterDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';

export default class MkbDiagnosis implements IMkbDiagnosis {
  id = '';
  name = '';
  code = '';
  comment?: string;
  mkbClassId?: string;
  mkbGroupId?: string;
  mkbSubGroupId?: string;
  mkbSubSubGroupId?: string;
  checked = false;
  relevant?: boolean;
  leaf = false;
  disabled = false;
  isEditMode = false;

  mkbSubDiagnosis: IMkbSubDiagnosis[] = [];
  mkbGroup?: IMkbGroup;

  queryStringDiagnosis = '';
  queryStringGroup = '';

  constructor(i?: IMkbDiagnosis) {
    if (!i) return;

    this.id = i.id;
    this.name = i.name;
    this.code = i.code;
    this.comment = i.comment;
    this.mkbClassId = i.mkbClassId;
    this.mkbGroupId = i.mkbGroupId;
    this.mkbSubGroupId = i.mkbSubGroupId;
    this.mkbSubSubGroupId = i.mkbSubSubGroupId;
    this.leaf = i.leaf;
    this.relevant = i.relevant;
    if (i.mkbSubDiagnosis) {
      this.mkbSubDiagnosis = i.mkbSubDiagnosis.map((d: IMkbSubDiagnosis) => new MkbSubDiagnosis(d));
    }
    this.disabled = false;
    this.mkbGroup = new MkbGroup(i.mkbGroup);
    this.isEditMode = i.isEditMode;

    this.setQueryStrings();
  }

  getFullName = (): string => `${this.code} ${this.name}`;

  setQueryStrings(): void {
    this.queryStringDiagnosis = this.getFullName();
    if (this.mkbGroup) this.queryStringGroup = this.mkbGroup.getFullName();
  }

  static CreateRelationDiagnosis(
    patientDiagnosis: boolean,
    diagnosis: IMkbDiagnosis,
    subDiagnosis?: IMkbSubDiagnosis
  ): IPatientDiagnosis | IRegisterDiagnosis {
    let newDiagnosisData: IPatientDiagnosis | IRegisterDiagnosis;

    if (patientDiagnosis) newDiagnosisData = new PatientDiagnosis();
    else newDiagnosisData = new RegisterDiagnosis();

    newDiagnosisData.id = uuidv4();
    newDiagnosisData.mkbDiagnosis = diagnosis;
    newDiagnosisData.mkbDiagnosis.setQueryStrings();
    newDiagnosisData.mkbDiagnosisId = diagnosis.id;

    if (subDiagnosis) {
      newDiagnosisData.mkbSubDiagnosis = subDiagnosis;
      newDiagnosisData.mkbSubDiagnosisId = subDiagnosis.id;
    }
    return newDiagnosisData;
  }
}
