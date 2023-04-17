import IUser from '@/interfaces/IUser';
import ISmaDiagnosis from '@/interfaces/sma/ISmaDiagnosis';
import ISmaIntrathecal from '@/interfaces/sma/ISmaIntrathecal';
import ISmaMolecularGeneticConfirmation from '@/interfaces/sma/ISmaMolecularGeneticConfirmation';
import ISmaNutritionSupport from '@/interfaces/sma/ISmaNutritionSupport';
import ISmaPathogenTherapy from '@/interfaces/sma/ISmaPathogenTherapy';
import ISmaPatientStatus from '@/interfaces/sma/ISmaPatientStatus';
import ISmaRehabilitationActivity from '@/interfaces/sma/ISmaRehabilitationActivity';

export default interface ISma {
  id: string;
  fullNameAbbreviation: string;
  fillDate: Date;
  patientId?: string;
  patient: Patient;
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
