import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

export default class RepresentativeType implements IRepresentativeType {
  id?: string;
  parentMaleType = '';
  parentWomanType = '';
  childMaleType = '';
  childWomanType = '';

  constructor(representativeType?: IRepresentativeType) {
    if (!representativeType) {
      return;
    }
    this.id = representativeType.id;
    this.parentMaleType = representativeType.parentMaleType;
    this.parentWomanType = representativeType.parentWomanType;
    this.childMaleType = representativeType.childMaleType;
    this.childWomanType = representativeType.childWomanType;
  }

  getParentTypeName(isMale: boolean): string {
    return isMale ? this.parentMaleType : this.parentWomanType;
  }
}
