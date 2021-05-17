import IMkbToPatient from '@/interfaces/mkb/IMkbToPatient';
import IMkb from '@/interfaces/mkb/IMkbClass';
import MkbClass from '@/classes/mkb/MkbСlass';

export default class MkbToPatient implements IMkbToPatient {
  id?: string;
  primary = false;
  mkbId = '';
  patientId = '';
  mkb: IMkb = new MkbClass();

  constructor(mkbToPatient?: IMkbToPatient) {
    if (!mkbToPatient) {
      return;
    }
    this.id = mkbToPatient.id;
    this.primary = mkbToPatient.primary ?? false;
    this.mkbId = mkbToPatient.mkbId;
    this.patientId = mkbToPatient.patientId;
    this.mkb = new MkbClass(mkbToPatient.mkb);
  }
}
