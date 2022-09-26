import MkbConcreteDiagnosis from '@/classes/mkb/MkbConcreteDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import Register from '@/classes/Register';
import IRegister from '@/interfaces/IRegister';
import IRegisterDiagnosis from '@/interfaces/IRegisterDiagnosis';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export default class RegisterDiagnosis implements IRegisterDiagnosis {
  id?: string;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis: IMkbSubDiagnosis = new MkbSubDiagnosis();
  mkbDiagnosisId?: string;
  mkbDiagnosis: IMkbDiagnosis = new MkbDiagnosis();
  mkbConcreteDiagnosisId?: string;
  mkbConcreteDiagnosis: IMkbConcreteDiagnosis = new MkbConcreteDiagnosis();
  registerId?: string;
  register?: IRegister;

  constructor(i?: IRegisterDiagnosis) {
    if (!i) return;
    this.id = i.id;
    this.mkbDiagnosisId = i.mkbDiagnosisId;
    if (i.mkbDiagnosis) this.mkbDiagnosis = new MkbDiagnosis(i.mkbDiagnosis);
    this.mkbSubDiagnosisId = i.mkbSubDiagnosisId;
    if (i.mkbSubDiagnosis) this.mkbSubDiagnosis = new MkbSubDiagnosis(i.mkbSubDiagnosis);
    this.mkbConcreteDiagnosisId = i.mkbConcreteDiagnosisId;
    if (i.mkbConcreteDiagnosis) this.mkbConcreteDiagnosis = new MkbConcreteDiagnosis(i.mkbConcreteDiagnosis);
    this.registerId = i.registerId;
    if (i.register) this.register = new Register(i.register);
  }
}
