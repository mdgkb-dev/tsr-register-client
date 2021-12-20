import Region from '@/classes/user/Region';
import User from '@/classes/user/User';
import IRegion from '@/interfaces/IRegion';
import IRegionUser from '@/interfaces/IRegionUser';
import IUser from '@/interfaces/users/IUser';

export default class RegionUser implements IRegionUser {
  id?: string;
  regionId?: string;
  region?: IRegion;
  userId?: string;
  user?: IUser;

  constructor(i?: IRegionUser) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.regionId = i.regionId;
    if (i.region) {
      this.region = new Region(i.region);
    }
    this.userId = i.userId;
    if (i.user) {
      this.user = new User(i.user);
    }
  }
}
