import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

export default class DocumentFieldToHuman implements IDocumentFieldValue {
  id?: string;
  humanId?: string;
  documentFieldId?: string;
  valueString?: string;
  valueNumber?: number;
  valueDate?: Date | null;
}
