import ClassHelper from '@/services/ClassHelper';

export default class MkbResearch {
  constructor(i?: MkbResearch) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'mkbResearch';
  }
}
