import IAnesthesiaRiskReasons from '@/interfaces/sma/IAnesthesiaRiskReasons';
import IRiskReason from '@/interfaces/sma/IRiskReason';

export default interface ISmaIntrathecal {
  id: string;
  smaId: string;
  intrathecalAdministrationDataComment: string;
  riskReasons: IRiskReason[];
  anesthesiaRiskReasons: IAnesthesiaRiskReasons[];
}
