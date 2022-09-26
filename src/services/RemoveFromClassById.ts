import IWithId from '@/interfaces/IWithId';
import RemoveFromClass from '@/services/RemoveFromClass';

export default function RemoveFromClassById(id: string, arrayFromDelete: IWithId[], arrayForDelete: string[]): void {
  const index = arrayFromDelete.findIndex((a: IWithId) => a.id === id);
  RemoveFromClass(index, arrayFromDelete, arrayForDelete);
}
