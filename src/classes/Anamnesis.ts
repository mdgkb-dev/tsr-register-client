import MkbItem from '@/classes/MkbItem';
import ClassHelper from '@/services/ClassHelper';

export default class Anamnesis {
  id?: string;
  value = '';
  date: Date = new Date();
  @ClassHelper.GetClassConstructor(MkbItem)
  mkbItem?: MkbItem;
  mkbItemId?: string;
  patientId?: string;
  doctorName = '';

  constructor(i?: Anamnesis) {
    ClassHelper.BuildClass(this, i);
  }

  setValue(v: string): void {
    this.value = v;
  }

  setDoctorName(v: string): void {
    this.doctorName = v;
  }

  setDate(date: Date): void {
    console.log(date);
    this.date = new Date(date);
  }
}
