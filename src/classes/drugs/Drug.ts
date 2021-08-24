import IDrug from '@/interfaces/drugs/IDrug';

export default class Drug implements IDrug {
  id = '';
  name = '';

  constructor(i?: IDrug) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
  }
}
