import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

export default class RepresentativeType implements IRepresentativeType {
  id?: string;
  name = '';

  constructor(representativeType?: IRepresentativeType) {
    if (!representativeType) {
      return;
    }
    this.id = representativeType.id;
    this.name = representativeType.name;
  }
}
