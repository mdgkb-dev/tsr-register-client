import ClassHelper from '@/services/ClassHelper';

export default class Anamnesis {
  id?: string;
  value = '';
  date: Date = new Date();
  patientDiagnosisId?: string;
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
    this.date = new Date(date);
  }
}
