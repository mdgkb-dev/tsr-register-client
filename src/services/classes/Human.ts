import FileInfo from '@/classes/files/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ContactInfo from '@/services/classes/ContactInfo';
import ClassHelper from '@/services/ClassHelper';
import StringsService from '@/services/Strings';

export default class Human {
  id?: string;
  name = '';
  surname = '';
  patronymic = '';
  citizenship = '';
  placeBirth = '';
  carNumber = '';
  carModel = '';
  snils = '';
  photoId?: string;
  photo: IFileInfo = new FileInfo();
  photoMiniId?: string;
  photoMini: IFileInfo = new FileInfo();
  isMale = true;
  dateBirth = new Date();
  @ClassHelper.GetClassConstructor(ContactInfo)
  contactInfo: ContactInfo = new ContactInfo();
  slug = '';
  postIndex = '';
  address = '';

  constructor(i?: Human) {
    ClassHelper.BuildClass(this, i);
  }

  getFullName(): string {
    if (!this.surname.length && !this.name.length && !this.patronymic.length) {
      return '';
    }
    return `${this.surname} ${this.name} ${this.patronymic}`;
  }

  getGender(full?: boolean): string {
    if (full) {
      return this.isMale ? 'Мужской' : 'Женский';
    }
    return this.isMale ? 'М' : 'Ж';
  }

  capitalizeName(): void {
    this.name = StringsService.capitalizeString(this.name);
    this.surname = StringsService.capitalizeString(this.surname);
    this.patronymic = StringsService.capitalizeString(this.patronymic);
  }

  trimName(): void {
    this.name = this.name.trim();
    this.surname = this.surname.trim();
    this.patronymic = this.patronymic.trim();
  }

  sanitizeName(): void {
    this.trimName();
    this.capitalizeName();
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(this.photo);
    fileInfos.push(this.photoMini);
    return fileInfos;
  }

  removePhoto(): void {
    this.photo = new FileInfo();
    this.photoId = undefined;
  }
  removePhotoMini(): void {
    this.photoMini = new FileInfo();
    this.photoMiniId = undefined;
  }

  static GetFileInfos(item: Human): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    //
    // item.documents.forEach((doc: IDocument) => {
    //   doc.fileInfoToDocument.forEach((fileInfoToDoc: IFileInfoToDocument) => {
    //     if (fileInfoToDoc.fileInfo) {
    //       fileInfos.push(fileInfoToDoc.fileInfo);
    //     }
    //   });
    // });

    if (item.photo) {
      fileInfos.push(item.photo);
    }

    return fileInfos;
  }
}
