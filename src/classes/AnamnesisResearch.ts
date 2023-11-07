import ClassHelper from '@/services/ClassHelper';

export default class AnamnesisResearch {
  constructor(i?: AnamnesisResearch) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'anamnesisResearch';
  }
}
