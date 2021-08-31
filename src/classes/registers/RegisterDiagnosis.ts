import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import Register from '@/classes/registers/Register';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';

export default class RegisterDiagnosis implements IRegisterDiagnosis {
  id?: string;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis?: IMkbSubDiagnosis;
  mkbDiagnosisId?: string;
  mkbDiagnosis: IMkbDiagnosis = new MkbDiagnosis();
  registerId?: string;
  register?: IRegister;

  constructor(i?: IRegisterDiagnosis) {
    if (!i) return;
    this.id = i.id;
    this.mkbDiagnosisId = i.mkbDiagnosisId;
    if (i.mkbDiagnosis) this.mkbDiagnosis = new MkbDiagnosis(i.mkbDiagnosis);
    this.mkbSubDiagnosisId = i.mkbSubDiagnosisId;
    if (i.mkbSubDiagnosis) this.mkbSubDiagnosis = new MkbSubDiagnosis(i.mkbSubDiagnosis);
    this.registerId = i.registerId;
    if (i.register) this.register = new Register(i.register);
  }
}
