import { v4 as uuidv4 } from 'uuid';

import Anamnesis from '@/classes/Anamnesis';
import MkbItem from '@/classes/MkbItem';
import Patient from '@/classes/Patient';
import ClassHelper from '@/services/ClassHelper';

export default class PatientDiagnosis {
  id?: string;
  primary = false;
  selected = false;
  editMode = false;
  patientId?: string;
  patient?: Patient;
  doctorName = '';
  @ClassHelper.GetClassConstructor(Anamnesis)
  anamneses: Anamnesis[] = [];
  patientDiagnosisAnamnesisForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(MkbItem)
  mkbItem?: MkbItem;
  mkbItemId?: string;
  constructor(i?: PatientDiagnosis) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(mkbItem: MkbItem): PatientDiagnosis {
    const item = new PatientDiagnosis();
    item.mkbItem = new MkbItem(mkbItem);
    item.mkbItemId = mkbItem.id;
    return item;
  }

  addAnamnesis(): Anamnesis {
    const item = new Anamnesis();
    item.id = uuidv4();
    item.patientDiagnosisId = this.id;
    this.anamneses.push(item);
    return item;
  }
}
