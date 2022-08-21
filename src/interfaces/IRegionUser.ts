import IRegion from '@/interfaces/IRegion';
import IUser from '@/interfaces/IUser';

export default interface IRegionUser {
  id?: string;
  regionId?: string;
  region?: IRegion;
  userId?: string;
  user?: IUser;
}
