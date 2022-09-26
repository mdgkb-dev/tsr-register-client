import { v4 as uuidv4 } from 'uuid';

import MkbGroup from '@/classes/mkb/MkbGroup';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import RegisterDiagnosis from '@/classes/RegisterDiagnosis';
import IRegisterDiagnosis from '@/interfaces/IRegisterDiagnosis';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';

export default class MkbDiagnosis implements IMkbDiagnosis {
  id = '';
  name = '';
  code = '';
  fullName = '';
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
  queryStringConcreteDiagnosis = '';
  queryStringGroup = '';

  constructor(i?: IMkbDiagnosis) {
    if (!i) return;

    this.id = i.id;
    this.name = i.name;
    this.code = i.code;
    this.comment = i.comment;
    this.fullName = i.fullName;
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
    this.queryStringDiagnosis = this.fullName;
    if (this.mkbGroup) this.queryStringGroup = this.mkbGroup.fullName;
  }

  static CreateRelationDiagnosis(
    patientDiagnosis: boolean,
    diagnosis: IMkbDiagnosis,
    subDiagnosis?: IMkbSubDiagnosis,
    concreteDiagnosis?: IMkbConcreteDiagnosis
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

    if (concreteDiagnosis) {
      newDiagnosisData.mkbConcreteDiagnosis = concreteDiagnosis;
      newDiagnosisData.mkbConcreteDiagnosisId = concreteDiagnosis.id;
    }
    return newDiagnosisData;
  }

  getAllConcreteDiagnosis(): IMkbConcreteDiagnosis[] {
    const items: IMkbConcreteDiagnosis[] = [];
    this.mkbSubDiagnosis.forEach((msd: IMkbSubDiagnosis) => {
      if (msd.name === 'Нарушения обмена цикла мочевины') {
        console.log(msd);
      }
      items.push(...msd.mkbConcreteDiagnosis);
    });
    return items;
  }

  getConcreteDiagnosis(id: string): IMkbConcreteDiagnosis | undefined {
    let concreteDiagnosis: IMkbConcreteDiagnosis | undefined;
    this.mkbSubDiagnosis.forEach((d: IMkbSubDiagnosis) => {
      const item = d.getConcreteDiagnosis(id);
      if (item) {
        concreteDiagnosis = item;
      }
    });
    return concreteDiagnosis;
  }
}
