import IPatient from '@/interfaces/patients/IPatient';
import ISmaDiagnosis from '@/interfaces/sma/ISmaDiagnosis';
import ISmaMolecularGeneticConfirmation from '@/interfaces/sma/ISmaMolecularGeneticConfirmation';
import ISmaPatientStatus from '@/interfaces/sma/ISmaPatientStatus';
import ISmaPathogenTherapy from '@/interfaces/sma/ISmaPathogenTherapy';
import ISmaRehabilitationActivity from '@/interfaces/sma/ISmaRehabilitationActivity';
import ISmaNutritionSupport from '@/interfaces/sma/ISmaNutritionSupport';
import ISmaIntrathecal from '@/interfaces/sma/ISmaIntrathecal';
import IUser from '@/interfaces/users/IUser';

export default interface ISma {
  id: string;
  fullNameAbbreviation: string;
  fillDate: Date;
  patientId?: string;
  patient: IPatient;
  userId: string;
  user: IUser;
  smaFormDiagnosisId: string;
  smaFormDiagnosis: ISmaDiagnosis;
  smaFormMolecularGeneticConfirmationId: string;
  smaFormMolecularGeneticConfirmation: ISmaMolecularGeneticConfirmation;
  smaFormPatientStatusId: string;
  smaFormPatientStatus: ISmaPatientStatus;
  smaFormPathogenTherapyId: string;
  smaFormPathogenTherapy: ISmaPathogenTherapy;
  smaFormRehabilitationActivitiesId: string;
  smaFormRehabilitationActivities: ISmaRehabilitationActivity;
  smaFormNutritionSupportId: string;
  smaFormNutritionSupport: ISmaNutritionSupport;
  smaFormIntrathecalId: string;
  smaFormIntrathecal: ISmaIntrathecal;
}
