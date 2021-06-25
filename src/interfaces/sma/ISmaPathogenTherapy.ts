import IDrugReplacementReason from '@/interfaces/sma/IDrugReplacementReason';
import INusinersenAdministrationDates from '@/interfaces/sma/INusinersenAdministrationDates';
import IRisdiplamAdministration from '@/interfaces/sma/IRisdiplamAdministration';

export default interface ISmaPathogenTherapy {
  id: string;
  smaFormId: string;
  pathogenTherapyDataComment: string;
  isPathogenTherapyBeingCarriedNow: boolean;
  pathogenTherapyType: string;
  drugsReplacementReason: string;
  respiratorySupport: string;
  risdiplamAdministrations: IRisdiplamAdministration;
  nusinersenAdministrationDates: INusinersenAdministrationDates;
  drugReplacementReasons: IDrugReplacementReason[];
}
