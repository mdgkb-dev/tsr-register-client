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
  mkbDiagnosis?: IMkbDiagnosis;
  registerId?: string;
  register?: IRegister;

  constructor(registerDiagnosis?: IRegisterDiagnosis) {
    if (!registerDiagnosis) {
      return;
    }
    this.id = registerDiagnosis.id;
    this.mkbDiagnosisId = registerDiagnosis.mkbDiagnosisId;
    if (registerDiagnosis.mkbDiagnosis) {
      this.mkbDiagnosis = new MkbDiagnosis(registerDiagnosis.mkbDiagnosis);
    }
    this.mkbSubDiagnosisId = registerDiagnosis.mkbSubDiagnosisId;
    if (registerDiagnosis.mkbSubDiagnosis) {
      this.mkbSubDiagnosis = new MkbSubDiagnosis(registerDiagnosis.mkbSubDiagnosis);
    }
    this.registerId = registerDiagnosis.registerId;
    if (registerDiagnosis.register) {
      this.register = new Register(registerDiagnosis.register);
    }
  }
}
