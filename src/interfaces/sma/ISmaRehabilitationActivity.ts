import IRehabilitationActivity from '@/interfaces/sma/IRehabilitationActivity';
import ISupportingDevice from '@/interfaces/sma/ISupportingDevice';

export default interface SmaRehabilitationActivity {
  id: string;
  smaId: string;
  rehabilitationActivitiesDataComment: string;
  respiratorySupport: string;
  rehabilitationActivities: IRehabilitationActivity[];
  supportingDevices: ISupportingDevice[];
  rehabilitationActivitiesPeriodicity: string;
}
