import IRisdiplamAdministration from '@/interfaces/sma/IRisdiplamAdministration';
import INusinersenAdministrationDates from '@/interfaces/sma/INusinersenAdministrationDates';
import IDrugReplacementReason from '@/interfaces/sma/IDrugReplacementReason';

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
