import IDrugDiagnosis from '@/interfaces/drugs/IDrugDiagnosis';

import IDrugRegimen from './IDrugRegimen';

export default interface IDrug {
  id?: string;
  name: string;

  nameMNN: string;
  form: string;
  doze: string;
  registered: boolean;
  // dateRegistration?: Date;

  drugRegimens: IDrugRegimen[];
  drugRegimensForDelete: string[];

  drugsDiagnosis: IDrugDiagnosis[];
  drugsDiagnosisForDelete: string[];

  addDrugRegimen: (item: IDrugRegimen) => void;
  removeDrugRegimen: (index: number) => void;
}
