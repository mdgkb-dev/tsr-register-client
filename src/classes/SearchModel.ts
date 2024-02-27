import SearchGroup from '@/classes/SearchGroup';
import ClassHelper from '@/services/ClassHelper';

export default class SearchModel {
  query = '';
  params = '';
  suggester = false;
  mustBeTranslated = true;
  options: any[] = [];
  searchGroupId = '';
  searchGroups: SearchGroup[] = [];
  searchGroup: SearchGroup = new SearchGroup();

  // searchObjects: SearchObject[] = [];

  constructor(i?: SearchModel) {
    ClassHelper.BuildClass(this, i);
  }

  toUrl(): string {
    return JSON.stringify(this);
  }

  setSearchGroup(groupId: string | undefined): void {
    if (!groupId) {
      this.searchGroups.forEach((group: SearchGroup) => {
        group.active = true;
      });
      return;
    }
    this.searchGroups.forEach((group: SearchGroup) => {
      group.active = group.id === groupId;
    });
  }
}
