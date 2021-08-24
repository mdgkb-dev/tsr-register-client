export default interface IFileInfo {
  id?: string;
  category?: string;
  originalName: string;
  file?: File;
  isDraft?: boolean;
}
