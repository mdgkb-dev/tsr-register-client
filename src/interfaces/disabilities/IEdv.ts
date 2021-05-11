import IPeriod from '@/interfaces/shared/IPeriod';
import IDisability from '@/interfaces/disabilities/IDisability';

export default interface IEdv {
  id?: string;
  disabilityId?: string;
  period?: IPeriod;
  parameter1?: boolean;
  parameter2?: boolean;
  parameter3?: boolean;
  disability?: IDisability;
}
