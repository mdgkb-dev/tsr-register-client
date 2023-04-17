import MkbItem from '@/classes/MkbItem';
import IWithMkbItem from '@/interfaces/IWithMkbItem';

export default interface IMkbLinker {
  id?: string;
  getMkbItems: () => IWithMkbItem[];
  addMkbItem: (mkbItem: MkbItem) => void;
  removeMkbItem: (i: number | string) => void;
}
