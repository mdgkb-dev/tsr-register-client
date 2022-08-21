import IHumanConstructor from '@/interfaces/IHumanConstructor';

export default interface IHuman extends IHumanConstructor {
  getFullName: () => string;
  getGender: (full?: boolean) => string;
  removeDocumentFieldValuesIds: () => void;
  haveDocument: (documentTypeId: string) => boolean;
  addressesEqual: () => boolean;
  setResidentialAddress: (addressesEqual: boolean) => void;
}
