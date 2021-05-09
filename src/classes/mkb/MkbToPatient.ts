import IMkbToPatient from '@/interfaces/mkb/IMkbToPatient';
import IMkb from '@/interfaces/mkb/IMkb';
import Mkb from '@/classes/mkb/Mkb';

export default class MkbToPatient implements IMkbToPatient {
  id?: string;
  primary = false;
  mkbId = '';
  patientId = '';
  mkb: IMkb = new Mkb();

  constructor(mkbToPatient?: IMkbToPatient) {
    if (!mkbToPatient) {
      return;
    }
    this.id = mkbToPatient.id;
    this.primary = mkbToPatient.primary ?? false;
    this.mkbId = mkbToPatient.mkbId;
    this.patientId = mkbToPatient.patientId;
    this.mkb = new Mkb(mkbToPatient.mkb);
  }
}
