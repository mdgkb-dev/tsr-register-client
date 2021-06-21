import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IRegister from '@/interfaces/registers/IRegister';

import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import Register from '@/classes/registers/Register';

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
