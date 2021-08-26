import IDrugRegimen from './IDrugRegimen';

export default interface IDrug {
  id?: string;
  name: string;

  drugRegimens: IDrugRegimen[];
  drugRegimensForDelete: string[];
}
