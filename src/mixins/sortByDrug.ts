import Sortable from 'sortablejs';

import IOrdered from '@/interfaces/IOrdered';

export default function sortByDrug(ordered: IOrdered[], evt?: Sortable.SortableEvent): void {
  if (evt?.oldIndex === undefined || evt?.newIndex === undefined) {
    return;
  }
  ordered.forEach((o: IOrdered, i: number) => (o.order = i));
}
