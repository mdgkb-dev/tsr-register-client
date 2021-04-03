import IField from './IField';

export default interface IDocument {
  name: string;
  documentFields?: IField[];
}
