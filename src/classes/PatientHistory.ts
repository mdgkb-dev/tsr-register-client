import Patient from '@/classes/Patient';
import User from '@/classes/User';
import { PatientHistorActionType } from '@/interfaces/PatientHistorActionType';
import ClassHelper from '@/services/ClassHelper';

const actionsNames: Record<PatientHistorActionType, string> = {
  create: 'Создано',
  update: 'Обновлено',
  delete: 'Удалено',
};

export default class PatientHistory {
  id?: string;
  patientId?: string;
  user = new User();
  userId?: string;
  createdAt?: Date;
  actionType: PatientHistorActionType = PatientHistorActionType.Create;
  objectCopy = new Patient();

  constructor(i?: PatientHistory) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(patient: Patient, userId: string, actionType: PatientHistorActionType): PatientHistory {
    const item = new PatientHistory();
    item.patientId = patient.id;
    item.objectCopy = patient;
    item.userId = userId;
    item.actionType = actionType;
    return item;
  }

  getInfo(): string {
    return `${actionsNames[this.actionType]} пользователем ${this.user.login}`;
  }
}
