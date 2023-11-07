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

  static GetClassName(): string {
    return 'patientDiagnosis';
  }
}
