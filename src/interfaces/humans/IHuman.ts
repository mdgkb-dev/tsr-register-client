import IHumanConstructor from './IHumanConstructor';

export default interface IHuman extends IHumanConstructor {
  getFullName: () => string;
  getGender: (full?: boolean) => string;
  removeDocumentFieldValuesIds: () => void;
}
