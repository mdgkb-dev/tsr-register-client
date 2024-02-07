import ClassHelper from '@/services/ClassHelper';

export default class SearchElement {
  id = '';
  value = '';
  label = '';
  key = '';
  description = '';
  route = '';
  // searchGroup: SearchGroup = new SearchGroup();
  searchElementMetas: any[] = [];

  constructor(i?: SearchElement) {
    ClassHelper.BuildClass(this, i);
  }
}
