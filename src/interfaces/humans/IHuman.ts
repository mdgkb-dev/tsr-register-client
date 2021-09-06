import IHumanConstructor from '@/interfaces/humans/IHumanConstructor';

export default interface IHuman extends IHumanConstructor {
  getFullName: () => string;
  getGender: (full?: boolean) => string;
  removeDocumentFieldValuesIds: () => void;
}
