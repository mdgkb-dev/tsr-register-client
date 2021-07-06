import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

export default class RepresentativeType implements IRepresentativeType {
  id?: string;
  name = '';
  childMaleType = '';
  childWomanType = '';
  isMale = false;

  constructor(representativeType?: IRepresentativeType) {
    if (!representativeType) {
      return;
    }
    this.id = representativeType.id;
    this.name = representativeType.name;

    this.childMaleType = representativeType.childMaleType;
    this.childWomanType = representativeType.childWomanType;

    this.isMale = representativeType.isMale;
  }
}
