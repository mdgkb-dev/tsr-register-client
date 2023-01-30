import IWithId from '@/interfaces/IWithId';

export default function RemoveFromClass(index: number, arrayFromDelete: IWithId[], arrayForDelete: string[]): void {
  if (index < 0) {
    return;
  }
  const idForDelete = arrayFromDelete[index].id;
  if (idForDelete) {
    arrayForDelete.push(idForDelete);
  }
  arrayFromDelete.splice(index, 1);
}
