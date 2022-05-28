import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IRegister from '@/interfaces/registers/IRegister';

export default interface IRegisterDiagnosis {
  id?: string;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis: IMkbSubDiagnosis;
  mkbDiagnosisId?: string;
  mkbDiagnosis: IMkbDiagnosis;
  mkbConcreteDiagnosisId?: string;
  mkbConcreteDiagnosis: IMkbConcreteDiagnosis;
  registerId?: string;
  register?: IRegister;
}
