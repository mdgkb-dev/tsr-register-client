import IRiskReason from '@/interfaces/sma/IRiskReason';
import IAnesthesiaRiskReasons from '@/interfaces/sma/IAnesthesiaRiskReasons';

export default interface ISmaIntrathecal {
  id: string;
  smaId: string;
  intrathecalAdministrationDataComment: string;
  riskReasons: IRiskReason[];
  anesthesiaRiskReasons: IAnesthesiaRiskReasons[];
}
