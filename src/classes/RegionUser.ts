import Region from '@/classes/Region';
import User from '@/classes/User';
import ClassHelper from '@/services/ClassHelper';

export default class RegionUser {
  id?: string;
  regionId?: string;
  region?: Region;
  userId?: string;
  user?: User;

  constructor(i?: RegionUser) {
    ClassHelper.BuildClass(this, i);
  }
}
